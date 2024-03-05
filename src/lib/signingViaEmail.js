import pkg from 'docusign-esign';
const { ApiClient, EnvelopesApi, EnvelopeDefinition, Document, Signer, CarbonCopy, SignHere, DateSigned, Tabs, Recipients } = pkg;

// console.log(data, applications);

/**
 * This function does the work of creating the envelope
 */

//ds-snippet-start:eSign2Step3
const sendEnvelope = async (args) => {
  // Data for this method
  // args.basePath
  // args.accessToken
  // args.accountId

  // console.log('sendEnvelope args: ', args)

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

  // console.log('makeEnvelope args: ', args)

  // document 1 (html) has tag **signature_1**

  //
  // The envelope has two recipients.
  // recipient 1 - signer
  // recipient 2 - cc
  // The envelope will be sent first to the signer.
  // After it is signed, a copy is sent to the cc person.

  // create the envelope definition
  let env = new EnvelopeDefinition();
  env.emailSubject = `NPU-${args.NPU} Voting Report ${args.date}`;

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
    name: args.plannerName,
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
  cc1.routingOrder = '3';
  cc1.recipientId = '3';

  // Create signHere fields (also known as tabs) on the documents,
  // We're using anchor (autoPlace) positioning
  //
  // The DocuSign platform searches throughout your envelope's
  // documents for matching anchor strings. So the
  let signHere1 = SignHere.constructFromObject({
    anchorString: '**signature_1**',
    anchorYOffset: '0',
    anchorUnits: 'pixels',
    anchorXOffset: '20',
  });
  let signHere2 = SignHere.constructFromObject({
    anchorString: '**signature_2**',
    anchorYOffset: '0',
    anchorUnits: 'pixels',
    anchorXOffset: '20',
  });
  let date1 = DateSigned.constructFromObject({
    anchorString: '**date_1**',
    anchorYOffset: '0',
    anchorUnits: 'pixels',
    anchorXOffset: '20',
    name: "Date Signed",
    recipientId: "1",
    tab_label: "date_signed_1",
    fontSize: "Size14",
  });
  let date2 = DateSigned.constructFromObject({
    anchorString: '**date_2**',
    anchorYOffset: '0',
    anchorUnits: 'pixels',
    anchorXOffset: '20',
    name: "Date Signed",
    recipientId: "2",
    tab_label: "date_signed_2",
    fontSize: "Size14",
  });

  // Tabs are set per recipient / signer
  let signer1Tabs = Tabs.constructFromObject({
    signHereTabs: [signHere1], dateSignedTabs: [date1]
  });
  let signer2Tabs = Tabs.constructFromObject({
    signHereTabs: [signHere2], dateSignedTabs: [date2]
  });
  signer1.tabs = signer1Tabs;
  signer2.tabs = signer2Tabs;

  // Add the recipients to the envelope object
  let recipients = Recipients.constructFromObject({
    signers: [signer1, signer2],
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
  // Data for this method
  // args.signerEmail
  // args.signerName
  // args.ccEmail
  // args.ccName

  return `${`
    <!DOCTYPE html>
    <html>
        <head>
          <meta charset="UTF-8">
        </head>
        <body style="font-family:Helvetica,sans-serif;margin:1.5em;">

        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAkAAAB3CAMAAABWvukRAAAACXBIWXMAAC4jAAAuIwF4pT92AAABTVBMVEX///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABviDd3AAAAbnRSTlMAEB8gLS4wOzw9QEhKUFRXYGFiZGxwdHd5fICBgoOEh4mLjI6QkpSVlpygoaKlpqitr7C1uLm7vL2+v8DDxMjLzM/Q0tPU1dbX2Nna29zd3t/g4eLk5efo6err7O3u7/Dx8vP09fb3+Pn6+/z9/rJzTokAACAuSURBVHja7Z3rg+M4ctiL4h4tw+aKjoPMHs6OfI5uzqJzD8n2OUnZY4vx5rzxKhvmYnlv7o7c7V3NzLJH9f9/9Ae+ABIkIYpqdfegPnWLL6BQ9SNQKAIAVqxYsWLFihUrVqxYsWLFihUrVqxYsWLFihUrVqxYsWLFihUrVqxYsXIt4fjidy+sGqxY+bBlc6T56buPrnBnj7lPUB9CBM+xmR3GHGvsVlryEXz08/yvwyYBTu9+Uh2aI/KL78/CmIiIopUHAIEQYtRtgoio5aqI7Zt5iDiNZojUG60wl61gT6Jl2TalRkkdjkRERBg4ACCMYFdUG0PuFApejWnAsS1v5SHkP0Tv3//iK/rdhnPOCQ4Ivz1EAADwmn4yP+L+UqfyCssjIqKtC0i5Q3tnvphCohYJnJQodaRXnQcAwNon6v1ksARNEkhViS/vLZTlHevmg8UPiKhBApHWVUg5AOVVdBhjvXqorglyBY+xCjRsFyu3kOVpM18jrgvow+zXd1+/e393d3d398Xink7zS1+vASmyquwBm0Zqcp9mWIOIqOq0lAZqSgIaLEEPCYjw0h72SIcyLr6TNkngoNoabkmCAZXJ1/iWBM9RFtmi/SMvm3kxA7iQBH7eFQgYYyIiip2xJNgSRa1QQ0xEFD8oCVAIIVYREVHkPG4SBEQpa5MsXjHGgjAlEmBOglAIISIiSh1LgmcoOhDUJMiHiJfc301J8mAWewBe0RE9kwQpka9xJfmt9yAkEGVViGj7uEkgiMLmD1UFwBGYDzE8IxKwaogWjC241z8EsXLLLsERrkuCsPvVeSYJdHYfEoVhbe4PSQJwYjqvAg9Pgm1d2nq0EHQVxYgEDhGJSwtu5fFJsrwuCRySI3pnk8CVYmIau3eIyPeJyOkkgWa+zKvCdPItmXaWs4cEwKROgdd82am3c9p3d70mCdzyHkqRW5fqi689Hxsk4NTsJJxNAmiSQKPgRok7piw9JVrqXRQ7tXKpLBO4Lgl8ahgjFFNQHmJKFCH6iFj0+rfqjKUTpkREUZCXgoiixtyVIIoB4uIRK4yIUsSgNmuGREQRC/JZL0TMY+cpB/CKWyIAeFsiothvzY71kQCi4jFFQZGVtXNCIqK4PFNTChYT1uUNEFceFoH5VUpEYeE7QSxNUyAi8JSIUqEWX4oMRPmTHQBYYUoUI3rKOL1JpBWiBwFGRIS4WiFuy0IjuoN9AhYREaEXIAbF7K1IiSj2AQCCShd5IfKz1Hrk45TiP5RLa+UBhR+vTAJBRJ6uT8zKSLSTVlalvuP8VI7Rl38244Wi5EEd1xcVCappiyi/kohC5aRiOqI6L2w+oZcEIi+wVxW0mGCLovKxTkcpGBFhXV5BFBU38YsCRgBypD8s3HFVzcBIxa/ZGVVzfV6tDyb7M2p7ZqJUb1ANH8KiDA0SCCVOUBYnzcchjIi2ki4EURTXBQKRa0+ph1xsvHi8ZWX06ECbNsT3U5Fgq+l0qiQAUb6oVDf0codIC7fQkcDPr3Tzma02CXzpFqUP1vNndQm85nmGJMjR5aT5u5ly6BW3ze+2raKaainiFgkqF5apEhJRjJhS5UG64jdAEEeF52lJIPpJAHFRY1eNKBARZ4z5oTJ3wPOL0qIadaMWY0IhT7kqJJCmMfO+FaVRs7RWHnJ0oO8TzE7riUiAXSSo4wROmr/yHNX2YiISDoCLtR+wFmbKG211cYLyFiyWSLBywAmLJITilpj/nHd1zyaBKKbqvJRoW3gDdwBYmt++KkUk82grgrq8Ip9fyTvSIr80zG/FAcAJc8eifNjgCLX4Sh9l60J+AmriBJ0kqOMEJZeFNDnbcF5RFtxJi4L4qUQCXiiY5TdLfQC3GEdJJJDqERBRxKCoviXBLWR2WnRMKdDDkQDC6gUSq+97Xt0j1pGgem0FZa9CJYFXGb6bVj64LUf4NVzcKo7mxCNIkJYA84modt/8+aFUCqcuReopmijdzylJxIkQICyL6+QzqBWnMO9WNzWSVhHMYlA2ggQll2P1VCU1rCx4oFS1IEGojtty3bgVGQS06pFnmRSWYElwE9lvOg789WHCOIE7QAI3NyjV9iQu+LlZt/NmiYgxxhgrLVwlgainLVaVD/rlpTUJgrqM/CwScCJiHhEV+ZlExIDVBQ+JIuD11EZdCgFNEsQloXh9ICKK8ztXSUBV8bFNAibFZPILNCTYDpCg0Jo0IaOQAFcScldKVYVcgm1JgrQqj0ICuR41811LghsJdpBgfZxNRIJAM4HdJAGERHHT9lCa78rto2UlqdxlTbUkQPWR1SMUEog6NsbOIsGWiBymZO8y+RZBEQZpl4K1SICyWxYHGlnaUPmZngSB1P9CLQkizZRukwQ5l7eN6cY2dFBpI1GRQP6/rjs2SCDVQ3b/yJLgNrKuzHw2r3/dHJPZVBFDl9TxppYEHhGxhu0Nk6DxPUNgRgKYjgQuEUXA6j4BInryLfxOEoApCaLqziu1+BoS8EESrDTDgyYJICSK3eaUzxAJ+JkkkOrhWRLcXnbL2h7WAAD8kCX/+naumspF2WTbdjJLiwSARFFjGLGq3dPTkwCJ0tJN0ip5vjE6gKbrgH504FR0MSdBVE6oKf1oaXSwIorlUvAzSRA3+lMDJGCSCmMtCdw6RNFNAjefCmzqQUMCqY1W40kAdbfRsaODG0lS+XyyOCLM9kcO34t/CROSwCMpTwbc0FFI4Nc23LC9oDaKbe5LDStRprmKoT4rTDO3yDroWEYC9SSoY3oQmZPAwWLWvx7mhmHxbL+K822lCGKrFFV5O0hQ+6MXOcMkcMr5+VwffpsEsCL5myRf6EgA2/KLwyES1G3kpBeQIK6AIiwJbiSnmgkwOxwzBADYL6ckQT6nHHMPAFiYEiokKF9QUdv20nwCKp9b0kTKV/K7uHCCMnZdWGR5C1eav2uSIHLyeT4OAM7WZBYxZIwxP0zL92tYIMkJq6m/lJVP9fO7B1DM9rdIQGE3CYISon5KkaMlgfJJR1jMV0KQ5h2TFgnyjAP0HQA3wJIWDOSwf87lxpBOSwJHqepoEggi2jrF8MaS4CaSKeOEeR4daCYbXbo+QaiO53lFgm39YVzQtj2f6rSa2GkZYznbVT8kLbORKovkxS3knB6FBHFuen7zvF4SSFFKD6D82jLcpnkfoUgkyu+GZTxDW4qqvB0kACSidBvGxbOaJEBq64RSxJjqRIlGWMCLlcZInSqrQ8pSQnnNhx4S5JQvqjqeBPkqCkWxLQluIvsqgWi57/T8ixcCC+Qgf+wro/nSUtP2FEMdEYy9tjEG6r8sf/FGCglqCEV6EgiqM2Dk88xIEDrNgkb52CdOlWzjqhSt0UFZ3i4SSNnDgWZ00FqRqM57zrXZJkHe76lXkKpIkNesqlBzikFPAkXBo0lQFzuyJLiRLDKA2XoGAJBVIYP5+9m0JABHlG+iSFn6yo9KS2W6LxbzD3coXTkaY8RGJyL3MidMZRIAj3M36ogYgojzm/r5eYKZkiBGXsc3i+XZUuEUtSt+UD8jSrlokaAobxcJwFkVScqeLmIIvBlrdwrX3HrQQYJ8jJaXN2TSI4uiFP7d/GKxgwTFWmipLy4hQZ5HSoQ2YnjLTsHmeID1/liTAA58YhIAgMsC4XevuodVrKtxFQ8utAwWcKM7eAHXFc/wO3ypoLmTeL6Qb2daCm0FxFmrQjN9RdTKMs67vwJ2Ndlgfc8L2BT2IXwX4KwnW5lIXvzdEn7wZnPc43G/lLsBCUxPggE7eLQWcP6KHE9/EY/w4rWYxopvVzd7ePno+O2rb9988y0e5tlJTTWUQ4azNb6Nn7HtWRK0x3IP30V3fBcgn4KIrGs+sHy1B4AXpwAA5r/8Q+XQprbk2XG33H/2EF0CZknwSES0s0KvLYyIIoyoPWdh5dry+gsAAFhmGwCeZGv52Oz0uuoerAHw6phePd5XwYdHAiftWurwqvAhaYEWKw8n//NNEVSaJwlmdDiuVfsHAIAFZjt4CBJsq/XLngEJRm4P9GiEIeJD75TGi9nSfPbFyoPJx6/f1BHCzWG23M0UFLz7AmY//Q0lmzk8CAkes1/YhTYfqCvCGLPTBg8rL+6/a7/nZsfv1/9k2S7bvStHbGh7bFasPD/5j6cvD5qfF1m5/+GrbDffzObVumYFCfYzqzsrVp6NfPTdf4UjBwDOOeeSd8/XyQYA4K9fF50ElQRrWlvlWbHybOQrBFhklCTJDnF/nCsjhN0MeFbQoUo6xH/lnO8SPCQJLq0CrVh5DvKLf1P+XatLmu7uX1U/VKmFHBEz2ixOR74/JbZnYMXKMxgbvFfXIwKu7pD6KqoCh/NM+j2hoqdw+uYnVotWrDxxcdLWEqbqrunybmSHH9V/Z+Uap8vN/cdWj1asPG15e388tFHA9STg5ZdI88PhCLs9AMzWnGdzq0crVp6yLI7/Fw/tLVEX0oZHyg6lx+8VwQSiv4LFaQmwOf6fM4OGQpI8cYRV/5c5ra7QSXmUSb+pHyf4K2UFoWgbKBlqbutmQasw6m+l+LoUFycII+Vxofo4pqsD61FHf+2cIOytnVYF8Za7XSqonjKUKqWrSCPpx9W0U3dFZXW3lc6ad+w+ibVPainU9EIAAPAEKqvooHBNNcOaemCak4JmId1uow5El8h24StWoTeKIZntMg4Ah/YWB/MjaklQfJPId/SzGcwQAX5E504eNNchl3PMpcW/NVIeFeo+XLVO4vY1SrYqa90MlY0JoPWbZBOttFeR6h4nn6C9EYWsSx29tePpQO26VFCvHtup2TTstXd9RWLeq9q+dm9/WISt61lDL42TwmbJOhVqeiFU66M0zM4104xo6kHo1NcsJOs2ar0hqnahafARCdrz0xwAYPbmC+XXBQDMDsclnwHA/KiQoCjins8AYJHtDtnZX4o19u6YjgShXmvSCp+XkKBcMa16Q0eDjxNdDbkaQYLh2nWfJC1jzjrL5JxLAkUjgyTwuq25pXQTEkRdJw2RoPNCeS/uLvVdTgI2KQlCA6MwkS9eAQDALrur84kO2QkA5nj6/HDM/nd8UuYIi8yCcjpxvhnxxSi1WmUaEnT6XTQRCVSL6DxrO1wieSUwQxKEw7XreWDsDJKgz3zEsEYGScC6WlOjTmZAgnwV6xEk6LxQXvPRFAXnk0BMSQJhYBRGsrz/9pvfA8hm6yqfaHaEwykDfvxyCTC//1K9oFjvFH91QWyCWq0yCQlcGibohSSQF1YMuh8XDJNAcnEzEjCTW/WoIDS4EZ5PglojgyTgZ5BAmJDAH0uCrgt7Gh6nI8F2QhK4wzZoKj/8py8A+AFgeUJARMTdCQCSOU+WxxlA+v6njfHEDABg/m4qEviTkSDsNvF4KhJIXhcbPK6HBDVTzEiABo/rU0G1ElwPCbrNxwBpgyRo36ObBFsTEoixJOi6sE81bDISpBOSIDQwCkP5+H4GwBEAZoeEPuGccw4Ay9NxCbsdQPKfG8sUFOOC33x3d3d39/PLSSAmI0Fq0I4XkyDtHPXK4g07UB0vMyKBSyZWmho8r8/c4xEkSE1J0Naq03k4NSEBjiVB14V9IF1NRgLypiNBOmyDpnJcAwDPowX8vvFpYQaQ8LmaLPC9IwDALPsx53wTXU4CnIoEva4ppiJBpWBOBl7XR4LtWSTwTWrXq4KtAQnIP58EpUZGkIB1H/YMSEBjSdB1YdRTy2g6EvDJSOAZGIWhvEzlfKFEyTKe8SNAwmF5rNMMdklCSZIk+R5pn0xAApqKBOxcNxhHAhMnH4znKL0LIxKIi50cTU5ajSABNyTBAHdQt8t1v0OzsSQwuLB/KHMRCcLJSND3fgjPc8qfIwDArNgL8bBW8gz3SZ4/sDuWdz+sZ/IWib94/0eXk4BNRAJxrhuMI4EwOEdbzk7TupwERo+jc3BxDgnEaBKIbhKEJiQQY0kgbkqCeDISiBFN2SERyjMCi5M0PFgkdSYRKYSoT0q++/ZPLiUBvwIJ0oAxtp2EBBFiNESCyGfMj65KgrBRu8HHtVSgI0Gaby6v6aj02HtU7lZ4HgnYQA8EW94ySILtWBLoL1RKuGWMieuQgNxrkCDywFldTIJl8eWBsiXycVGSgCtqwHq7xM8Pf/f12798cREJtoMkiFgpniEJVgDl/p6XkoB1PA6bvVzfgFi+bpRsRAJsRvjZwONaKqAOFTjhmfbOoNxE/SwS+AOvLWx5yyAJ0rEkSAdJELcCBxOSIDAlgZebvdxCPP/JbV3iN6p+DglevHz5Jaqpg/Xl6+Q0L0mQKXflBTYWCwCA9fuv7y4iQTpIAhxWv/a3yUjABlyTmbimaJrWaBKwLs71qqCLBFpcDJGAnU8CMTBVga0YwiAJyBtJAv2F/cYxIQlWpiTo0H73gZEkSPZYfFMwL0iwrC/HfBHjhENjK7RFtgCYY5Ilh9NunezncBkJyPuASICTkQAmIwE8DAlWA2NvbHmLO+jQwVgSBDclQfSoSICId9WU9rq4bFFPExSMaJPguAAA3C0AYLbBOcClJAgsCT4EEujGvG73cdVbOk4Kx5IgvCkJyJF7h7cmQYaIVaJAFR9I9tUQgAPAgh83nPNjI8mg8X3iu8tIEFoSfAgk0OVksh5SmJAgHkuC+LYkYPKtb02CpOXdAACzJJ8sOBxwBoAJfvYKEeU1y3b7FgnSv8+y424zG0mC2JLgQyBB3d6N2GcHCZgBCcgdSQLthQ9HAvGISPDpV9I/y3o2ANZZdsiO+Rqm1ZLG9dFTvsWBumYBJTDnyWYkCci1JHj+JKgH/ag3eGx7y7BD+2NJ4N+UBPh4SPC/7uX/9sqnBQsOsLj/2xlsEmXa8E/++bfZ/tcoRxHmvM5KNF+4qJ1qZknw7ElQH16pM8hdvoomJFiNJcHqpiSgK5AgGEeCT98rg4N2x/7H75IkKX6+//EGo+T9b/7tG4DZiV4DzH+1R9xwOByT06dld2E/lgQrS4LnT4L6I26mPw/b3jLs0NFYEkS3JQGbngQ4cnTwOmlmE8qyS+rFy2aHb18hfn8BsMl9/ZRk2ed/j4hJ8g9LwN+Wuj6MJUFkSfD8SVDfgaVKLkknCTwDEtBYEtBtScCnJwHxcSTgr+u/N9gXTkywMcPAqxjB/l0COypWOOc4lgRkSfD8SVBnJcpLBfaRgJuQgI0lAbspCbZXIAFtnXyFkVxWpiT4OopefQwAL04/2/M+Ehx7iEHJnOhvEBGX6/14ErDrkICxVpqyJcGtSFBXQK4L6yHB1oQEYiwJhAkJPMmEJiVBOg0JGhnc8blrEgAAzBER377fACc8znpIMKv/nrdGEQTAN7TjfIlFTuIoEojrkAD64lZjvzvwJyMBfFAkqIcEcrZhHwlSExLgWBKgCQkMZBwJ5I7RBSTw2v2oM+WjL9/Tr5cAizv4hJR0AQBIkuSUJEmCiGsAvtd1D2oSjJCWWtD0W0Q2JQm6b9/3LaJzVRK0IflcSCAdE9qGaucgugYOTWNJQLclQTAJCdrpWtszFzXmdzP4+XED/FfLJDu9VQ8eOf8h55xzvjwcZzspTaDc9gRgjvju9WQkoEdMgoaEcBEJYmpHyz4IEnjSMW5IgsDEoflYEvCbkiCchgTtG6fM3BE3UfT5uxkAruEP7jMOLxN1Nxt5DLA+ySuaHarOxyxDfPMZvP1/H01Cgu3kJBCtKalJSJC6o0kQMsZWpJlL/yBIwPQz+dhHgtDEobdjSbAd0kyHcUxDgngaEjhxt8kY5Bkjrr+7XwAmHD79DOAHd2//R3nsD09JspNP/oFMAuR8s65wMTt9DHj/F1OQIH0iJJCWvT+bBK033lMmgTiXBEI6nckTyD0kiEwcOh1LgvSmJKBJvkDS79CApiOEBADSzxFgX2QA/GlcN8j9J0r4kGdvf1N2A3ZJdjrskzqOuPkUfvJ+PQUJ6GmQQFbxpSSI4amSIBRilY4nAVcWROgjgZFD01gS0G1JQNOQADzdBoCGI4SE8032WZYkyT3RNwDs7vgvVYbA6avklCyl4CGe3i75DIBnuxlUi59u9gDAv3j5ll80OsCnRQJ5f8ELSSD1Lp4aCTqK2E8CpTOsCcDKZ8QmJIjGkiC6KQniqUkAjs5azdxylyQJ/zMEAFjMDtn6P73/fQCYz6vZgR2vogEAAH+Oh4To18XWqDkJ7mYAMLv/bgwIJBWvnhgJLokTqH1DDz4sEiid4VRn2KiLD3Q79GosCVY3JQHGU5NAv+D+ytgbl7lHr7Nk84JO2fH7WbYoo4XVYufrMmQwr75MKEmQ/7O7cO7Af2okqG38IhLEDJ4PCZgJCZReAGqiJdKPmi2o2yf5Y0ng35YE2+lJoB0h+MZhw3wEcDi8/P/39/9tsUzWy2zD8zSiU9V7KIcJy10dOOA1CUaKZBVPjgSd2Udnjg6kkMNTJ4FjQAJHeYL2u2SJBFsDErBoJAm6L3wQEvArkACctsZS07BhkSawQMRFsTzBfHNI1gCw3M8wOwEAJGXa4KH+4nid4XQkaGdGPHoSiGlIIEXNnzgJQpPZeKakUaw0+RkyCbgJCcKxJAhvSgLvGiTQjRCMtkhdIyZyY2WNOMJpPyO5c7A7SBMKv0dfTkeC0IQEafVVhTclCfLbpgMk4IwFur0FrjOLiIjqbgKPnwSuCQl85ZDQnSmRwDMhQTCWBMFNSQDXIUF7hGC0B1LCOZe/ElCziJe7P+X5DgdljpG8fsHy+NP9MaOJSBCYkGDMdwfCqLENvzvwrkGC6Kl+d9CRx9LbYmoSaaCbTJVIACYkcMeSwL0tCfA6JGiNEIyyJJtfEjU+PIBfHn73ZR0dVL48wiMHmE/WJ3CvRYKOJP9xJIBrkICeBQlWYESCULmA6R4okwANSNDeJ9iQBJ0XtmsgrkACMSEJ1ANBSgZN2UuC5pdFyP/xa5xXKw7wX5UHFlQkHE9FglarPF8SiGaYwnv6JEAGZiTATjV4ulOECQm2Y0mwvSkJ2NVI0Eg4HEGCalMjzjl/+eX79/cvZ598UXfdPtlz/tPDDPj6WEYOJiPB9oMiwbNYnyAqgjYh9/RBQU2LxWrOi86yZRIwExLwsSTgNyUBXI8Eqt5GkKDcAy3ZI+Krn8Hsk/y7IsySJEGAf8qSJNlnSYbV+qWTkYBbEjw1EnS4RG+LdeuT60jgmJDAG0sC77YkiK5HAqWLPYIE+apka35sZAzOOed/nGjXKp2MBJ4lwQdAAq/Ro9DZvDKAiAxIAGNJALclweqKJMDLSJBwAFgcpT2RGiOHbHElEjitVrEkeI4k6EnjQC0JViYkwLEkwJuSwH/kJPhaP+uAWKcmT0+CdqtYEjxHEvBzSeAPksCHrpliGHvhA5HAebwkQN7t23kM4bC8GgmEJcHzJ4EwmExVSOCanMRGkaD7wgciQTOx9kmRoLWq8XQkYJYEz58E23NJ0PQW7UnOWBI4tyVB+HhJ8KMhEvDrkcCxJHj+JDjvky7R9hY9LqKRJOi48KFIEDweEuwSaY+jwts7fHt9kjMOrkCCRqtYEjxHEvSAQLNsvGh7i96hV2NJsLopCbzHQ4LGW54PkqC108GEJFg9fhK4j5AE3mQkYLclgdD6qmdCAn8sCfybkqCRWHtrEiSI5RKEfA+LH2b68+7n2vzkCUngD5IgFpUYkgABAJx0ChJwxhgOkEBon381EoTNcDx2qYAN2HvEGOPp9CSI1fbq/RZ8pfVVSA1I4I4lgTtIgvwTy+15JIihMa7pIMH2GiQIoDHUNvTGOSKW7j1PIDls9Ocd37x5c3d3l12PBO4gCdq1GyIBxY3vjceToGvWSzmnuT3K9CRYNR6HQ4+juHGS0RIN0TQkaDzTp7MUKtreonfoRlzRnAT6CxVLTLHRph3VDho6j2iYBPwaJEhXQsQjSKC86BNIXp4VY5ySBGqrjCcB7zO3eDISbA3C4dW34dORQJg4U3CuCjprNy0J5E2Pconb8MHuLlanQ4djSTB8YWdk0zxpqpMEbCoScIP2PosENEiC4xVJEE5DAmbiK5eTwMg1xeQk4CYd7LNV0BJ+FRKsWg2oGc9in7d0OHQwlgT8fBI4I0jAW+qL2g+6gATMoL2HZVaMDvCYZEnyYoAEs+uRgE9DAudcXxlHgvIc3yQePh0Jeg0uGKuClrhXIUF7m/RV+5nYM6PR5dDeWBJ4A3c/4xVr0o8QjWfhRCRwDNrbIGZ4WNR5RYPzjsvrkcCbhgQQGbjmxSRITRqhen9MRwJITfz3XBUYv0cuI0HUG9FgehKggUNDOpIE+gu5wYCvJVsDYxE9LXzRmkXRcHsbkODur8xJ8F/21yOB0ioXkCAwAPrFJKibKDSwmglJsDLx33NVYNoluJAE/RGNQE8CYeLQ27Ek0F7onh8m6NW56CKBPxUJginCBDN+Sl/+wJAEP0yvSILtNCToAaQ/FQmk2Lrb+Zaut0eZkAROd6fAg7Eq6BhlTEwCt81IzaR7kwS+iUOLsSTQXtgT/Nl2m3P3LppOFwmcqUgA8eVdAgBYbJL0dPjahASf/vcrkkBMRAIvHezZXUiCyDHhcQBXIEF3YEL23zNVYAqCy0jA2tXx2k7WJIFj4tBsLAk60qkik4ZvSOcrwYcuEijPmXyH1N7BTF+y4Xz4pG/fz69IAjYRCbR7waixk8tIsFLtIdC2QhrAVUgAfmrgv+epQBljeHAlEgSa6rSbvEkCxVu6HBrGkqAjxdrRj/r7dx/2tPxIfegmwWoqEnQ0+AquJHeDP1xCApiKBOCItl62DKYgQYq8NYp2w5ZzpqELVyIBOGLgcWeroM6I4W5vk11EAqF5Tbbjai0ShCYOjWNJ0JWXyzS7tw9uIhK0dJ4KB3pIEExGAl2Dh961QAC7pCFfw2MVLxCyMOe6j2NcfhpnD1q7jsc9sAqemzhMUZ/vmlzkKjoPvBvaPLNNaMWKFStWrFixYsWKFStWrFixYsWKFStWrFixYsWKFStWrFixYsWKFStWrFixYsWKFStWrFg5Q/4dHm4tZauesmQAAAAASUVORK5CYII="
        alt="Base64 encoded image" width="355" height="40"/>

  <br><br>
        <h2 style='margin-bottom:0;'>Voting Report: NPU-${args.NPU} | ${args.date}</h2>
        <h4 style='margin-top:0'>Meeting Location: ${args.loc}</h4>

        <table border='0' style='border-collapse:collapse;margin: auto;font-family:Helvetica,sans-serif;' width='90%'>
        <tr>
          <!-- CHAIR AND PLANNER CONTACT INFO -->
          <td>
            <h4>NPU Chair: ${args.chairName}</h4>
          </td>
          <td>
            <h4>Assigned Planner: ${args.plannerName}</h4>
          </td>
        </tr>
        <tr>
          <td colspan='2'>
            <p style="margin:0em; margin-bottom:0em;">Copied to: ${args.ccName}: ${args.ccEmail}</p>
          </td>
        </tr>
      </table>
        <br><br>

        <table border='1' style='border-collapse:collapse;font-family:Helvetica,sans-serif;' width='100%'>
        <thead>
          <tr>
            <th>Application Type</th>
            <th>Application Name</th>
            <th>Disposal</th>
          </tr>
        </thead>`

  +

  // if there are no applications, return a message to that effect
  (args.applications.length === 0 ? `<tr><td colspan="3" style='text-align: center'>No applications to report</td></tr>` : '')


  + args.applications.map(application => {
    return `
      <tr>
      <td style='padding-inline: 2%;'> ${application.type}</td>
      <td style='padding-inline: 2%;'> ${application.applName}</td>
      <td style='Padding-inline: 2%; text-align: right;'>${application.disposal}</td>
    </tr>
        ${application.comments ? `<tr>      <td colspan="3" style='padding-inline: 2%;'> ${application.comments}</td></tr>` : ''}
      `;
  }).join('')}</table>
    <br>
    <h3>Planner's Notes:</h3>
  <p>${args.pNotes}</p>
  <br>
  <!-- SIGNATURE BLOCKS -->
  <table border='0' style='font-family:Helvetica,sans-serif;margin: auto;' width='100%'>
    <thead>
      <tr>
        <td>
          <h4>Chair Signature:</h4>
        </td>
        <td>
          <h4>Planner Signature:</h4>
        </td>
      </tr>
    </thead>
    <tr style="height:75px">
      <td>
        <span style='color:white'>**signature_1**/</span>
      </td>
      <td>
        <span style='color:white'>**signature_2**/</span>
      </td>
    </tr>
    </thead>
    <tr>
      <td>
        <h4>Date:</h4>

      </td>
      <td>
        <h4>Date:</h4>

      </td>
    </tr>
    <tr style='text-align: center;'>
      <td>
        <span style='color:white'>**date_1**/</span>
      </td>
      <td>
        <span style='color:white'>**date_2**/</span>
      </td>
    </tr>

  </table>
</body>
<br><br><br>
<!-- FOOTER -->
<div>
  Prepared by the Department of City Planning, City of Atlanta | Send questions and bug reports to
  KDunlap@AtlantaGA.gov| Version 2.0.0
</div>
</html>
  `;
}
//ds-snippet-end:eSign2Step2

// handle errors
function processError(e) {
  console.log('Error: ', e);
  if (e) {
    if (e.response) {
      console.log('e.response: ', e.response);
    }
  }
}

export { sendEnvelope, makeEnvelope, document1 };
