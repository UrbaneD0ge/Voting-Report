import { ApiClient, EnvelopesApi, EnvelopeDefinition, Document, Signer, CarbonCopy, SignHere, date, Tabs, Recipients } from 'docusign-esign';

/**
 * This function does the work of creating the envelope
 */

//ds-snippet-start:eSign2Step3
const sendEnvelope = async (args) => {
  // Data for this method
  // args.basePath
  // args.accessToken
  // args.accountId

  let dsApiClient = new ApiClient();
  dsApiClient.setBasePath(args.basePath);
  dsApiClient.addDefaultHeader('Authorization', 'Bearer ' + args.accessToken);
  let envelopesApi = new EnvelopesApi(dsApiClient);
  let results = null;

  // Make the envelope request body
  let envelope = makeEnvelope(args.envelopeArgs);

  // Call the Envelopes::create API method
  // Exceptions will be caught by the calling function
  results = await envelopesApi.createEnvelope(args.accountId, {
    envelopeDefinition: envelope,
  }).catch(e => {
    console.log(e);
  }
  );
  let envelopeId = results.envelopeId;

  console.log(`Envelope was created. EnvelopeId ${envelopeId}`);
  return { envelopeId: envelopeId };
};
//ds-snippet-end:eSign2Step3

/**
 * Creates envelope
 * @function
 * @param {Object} args parameters for the envelope
 * @returns {Envelope} An envelope definition
 * @private
 */

//ds-snippet-start:eSign2Step2
function makeEnvelope(args) {
  // Data for this method
  // args.signerEmail
  // args.signerName
  // args.ccEmail
  // args.ccName
  // args.status


  // document 1 (html) has tag **signature_1**

  //
  // The envelope has two recipients.
  // recipient 1 - signer
  // recipient 2 - cc
  // The envelope will be sent first to the signer.
  // After it is signed, a copy is sent to the cc person.

  // create the envelope definition
  let env = new EnvelopeDefinition();
  env.emailSubject = `NPU-${args.signerData.NPU} Voting Report`;

  // add the documents
  let doc1 = new Document();
  let doc1b64 = Buffer.from(document1(args)).toString('base64');
  doc1.documentBase64 = doc1b64;
  doc1.name = `Planner's Report`; // can be different from actual file name
  doc1.fileExtension = 'html'; // Source data format. Signed docs are always pdf.
  doc1.documentId = '1'; // a label used to reference the doc

  // The order in the docs array determines the order in the envelope
  env.documents = [doc1];

  // create a signer recipient to sign the document, identified by name and email
  // We're setting the parameters via the object constructor
  let signer1 = Signer.constructFromObject({
    email: args.chairEmail,
    name: args.chairName,
    recipientId: '1',
    routingOrder: '1',
  });

  let signer2 = Signer.constructFromObject({
    email: args.plannerEmail,
    name: args.planner,
    recipientId: '2',
    routingOrder: '2',
  });
  // routingOrder (lower means earlier) determines the order of deliveries
  // to the recipients. Parallel routing order is supported by using the
  // same integer as the order for two or more recipients.

  // create a cc recipient to receive a copy of the documents, identified by name and email
  // We're setting the parameters via setters
  let cc1 = new CarbonCopy();
  cc1.email = args.ccEmail;
  cc1.name = args.ccName;
  cc1.routingOrder = '2';
  cc1.recipientId = '2';

  // Create signHere fields (also known as tabs) on the documents,
  // We're using anchor (autoPlace) positioning
  //
  // The DocuSign platform searches throughout your envelope's
  // documents for matching anchor strings. So the
  let signHere1 = SignHere.constructFromObject({
    anchorString: '**signature_1**',
    anchorYOffset: '10',
    anchorUnits: 'pixels',
    anchorXOffset: '20',
  });
  let signHere2 = SignHere.constructFromObject({
    anchorString: '**signature_2**',
    anchorYOffset: '10',
    anchorUnits: 'pixels',
    anchorXOffset: '20',
  });
  // let date1 = date.constructFromObject({
  //   anchorString: '**date_1**',
  //   anchorYOffset: '10',
  //   anchorUnits: 'pixels',
  //   anchorXOffset: '20',
  // });
  // let date2 = date.constructFromObject({
  //   anchorString: '**date_2**',
  //   anchorYOffset: '10',
  //   anchorUnits: 'pixels',
  //   anchorXOffset: '20',
  // });
  // Tabs are set per recipient / signer
  let signer1Tabs = Tabs.constructFromObject({
    signHereTabs: [signHere1],
  });
  let signer2Tabs = Tabs.constructFromObject({
    signHereTabs: [signHere2],
  });
  signer1.tabs = signer1Tabs;
  signer2.tabs = signer2Tabs;

  // Add the recipients to the envelope object
  let recipients = Recipients.constructFromObject({
    signers: [signer1],
    carbonCopies: [cc1],
  });
  env.recipients = recipients;

  // Request that the envelope be sent by setting |status| to "sent".
  // To request that the envelope be created as a draft, set to "created"
  env.status = args.status;

  return env;
}

/**
 * Creates document 1
 * @function
 * @private
 * @param {Object} args parameters for the envelope
 * @returns {string} A document in HTML format
 */

function document1(args) {

  console.log('document1 args: ', args);

  // Data for this method
  // args.signerEmail
  // args.signerName
  // args.ccEmail
  // args.ccName

  return `
    <!DOCTYPE html>
    <html>
        <head>
          <meta charset="UTF-8">
        </head>
        <body style="font-family:sans-serif;margin:2em;">
        <h1 style="font-family: 'Trebuchet MS', Helvetica, sans-serif;
                ;margin-bottom: 0;">Atlanta Department of City Planning</h1>
        <h2 style="font-family: 'Trebuchet MS', Helvetica, sans-serif;
                margin-top: 0px;margin-bottom: 2em;font-size: 1em;">Neighborhood Planning Units</h2>
        <h2>Voting Report: NPU-${args.signerData.NPU} | ${args.signerData.date.toLocaleDateString()}</h2>
        <h4>NPU Chair: ${args.signerData.chair}</h4>
        <h4>Meeting Location: ${args.signerData.loc}</h4>
        <h4>Assigned Planner: ${args.signerData.planner}</h4>
        <p style="margin-top:0em; margin-bottom:0em;">Email: ${args.signerEmail}</p>
        <p style="margin-top:0em; margin-bottom:0em;">Copy to: ${args.ccName}, ${args.ccEmail}</p>

        <table border='1' style='border-collapse:collapse;' width='100%'>`

    + args.signerArgs.map(item => {
      return `
        <tr>
          <td>${item.type}</td>
          <td>${item.applName}</td>
          <td>${item.disposal}</td>
        </tr>
        ${item.comments ? `<tr><td colspan="3">${item.comments}</td></tr>` : ''}
      `;
    }).join('') +

    `</table>
    <br>
    <div id="signature" style="display: block;">
    <div style='display: flex; flex-direction: row; justify-content: space-around;'>
      <div style='display: flex; flex-direction: column; justify-content: space-around;'>
        <label for="chairS">Chair Signature:</label>
        <span style='color:white'>**signature_1**/</span>
        <br>
        <label for="chairD">Date:</label>
        <span style='color:white'>**date_1**/</span>
      </div>
      <div style='display: flex; flex-direction: column; justify-content: space-around;'>
        <label for="plannerS">Planner Signature:</label>
        <span style='color:white'>**signature_2**/</span>
        <br>
        <label for="plannerD">Date:</label>
        <span style='color:white'>**date_2**/</span>
      </div>
    </div>
  </div>
  <p>
    Prepared by the Department of City Planning, City of Atlanta | Send questions and bug reports to
    KDunlap@AtlantaGA.gov| Version 2.0.0
  </p>
</body>

</html>
  `;
}
//ds-snippet-end:eSign2Step2

export { sendEnvelope, makeEnvelope, document1 };
