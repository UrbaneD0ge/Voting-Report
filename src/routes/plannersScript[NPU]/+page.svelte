<script>
  // get NPU from query params
  import { page } from '$app/stores';
  let npu = $page.url.pathname.slice(-1);
  export let data;

  data = data.props.data.features;

  // console.log(data);

  // replace the month number with the month name
  data.forEach((app) => {
    switch (app.attributes.MonthChoice) {
      case '01_JAN':
        app.attributes.MonthChoice = 'January';
        break;
      case '02_FEB':
        app.attributes.MonthChoice = 'February';
        break;
      case '03_MAR':
        app.attributes.MonthChoice = 'March';
        break;
      case '04_APR':
        app.attributes.MonthChoice = 'April';
        break;
      case '05_MAY':
        app.attributes.MonthChoice = 'May';
        break;
      case '06_JUN':
        app.attributes.MonthChoice = 'June';
        break;
      case '07_JUL':
        app.attributes.MonthChoice = 'July';
        break;
      case '08_AUG':
        app.attributes.MonthChoice = 'August';
        break;
      case '09_SEP':
        app.attributes.MonthChoice = 'September';
        break;
      case '10_OCT':
        app.attributes.MonthChoice = 'October';
        break;
      case '11_NOV':
        app.attributes.MonthChoice = 'November';
        break;
      case '12_DEC':
        app.attributes.MonthChoice = 'December';
        break;
      // default:
      //   app.attributes.MonthChoice = 'the past month';
    }
    switch (app.attributes.Apptype) {
      case '1_MOSE':
        app.attributes.Apptype = 'Mayors Office of Special Events';
        break;
      case '2_LRB':
        app.attributes.Apptype = 'License Review Board';
        break;
      case '3_BZA':
        app.attributes.Apptype = 'Board of Zoning Adjustment';
        break;
      case '4_ZRB':
        app.attributes.Apptype = 'Zoning Review Board';
        break;
    }
  });
</script>

<main>
  <h1>Planners Script</h1>

  <h2>
    We have a lot of really important information to share this month, so thank
    you for being patient!
    <ul>
      <li>
      <p>This year, the City of Atlanta is celebrating the 50th Anniversary of the Neighborhood Planning Units and the 50th Anniversary of the inauguration of Atlanta's first African-American mayor, Maynard Jackson. In honor of Mayor Jackson's birthday, the Department of City Planning is commemorating his legacy of love with <b>"Legacy Week"</b> - a week of empowering and educational events geared toward civic engagement. <a href="https://www.npuatlanta.org/50th-anniversary" target="_blank">Join us at one of our events</a> to celebrate with us and learn more about how your voice can be heard on matters concerning your neighborhood. </p>
      </li>
      <li>
      <p>Thanks to all who attended our <b>Plan_A kickoff</b>, the beginning of our 18-month process to update <a href="/home/showdocument?id=61663" target="_blank">Atlanta’s Comprehensive Development Plan</a>. Next up are the Community Open Houses in March and April. We invite you to attend the one closest to you and help us Plan Atlanta Together! </p>
      </li>
      <li style="margin-block: 0;">
      <strong>NPU University</strong> courses coming up are:
      </li>
      <ul style="margin: 0;">
          <li style="margin: 0;">“<i>Reducing Property Taxes with Homestead Exemptions and Appeals</i>” on Thursday March 14<sup>th</sup></li>
          <li style="margin: 0;">“<i>Building Permits and Accela for Beginners</i>” on Thursday, March 28<sup>th</sup></li>
          Register at <a href="https://www.npuatlanta.org/npuuniversity" target="_blank">NPUatlanta.org</a><br>
      </ul>
      <li>
      <p>Nominations are open for the <b>Community Design Awards</b>! You can submit a nomination individually or as an NPU body. Submissions for the “<a href="https://www.atlantaga.gov/government/departments/city-planning/public-meetings-boards-commissions/urban-design-commission/design-awards" target="_blank">Award of Excellence</a>” are due by March 14<sup>th</sup>!</p>
      </li>
      <li>
      <p>The&nbsp;<strong>Capital Improvements Element (CIE)</strong>&nbsp;of the Comprehensive Development Plan (CDP) is accepting project ideas for your neighborhood in the online&nbsp;<a href="https://www.atlantaga.gov/government/departments/city-planning/2021-2025-cie-update" target="_blank">submission portal</a>&nbsp;now through&nbsp;<strong>March 8<sup>th</sup></strong>.</p>
      </li>
      <li>
      <p>There’s a lot happening in DCP this year! Text <b>NPUATL</b> to <b>24251</b> to get updates on Plan_A and the 50<sup>th</sup> anniversary of the NPUs – or to make sure you don’t miss anything!</p>
      </li>
  </ul>
    Please click on the link I’ve dropped in the chat for more information on these
    updates.
  </h2>

  <hr />
  <h3>Application Updates - NPU-{npu}</h3>
  <br />
  <h2>
    I have one last thing to report. In May of 2023, we began a pilot program to
    provide updates on your voting items as they progress through the approval
    process. We’re excited to roll this out to all NPUs citywide and here are the application updates for NPU-{npu}!
  </h2>
  <ul>
    {#if data.length == 0}
      <br />
      <h2><i>No application updates to report.</i></h2>
    {/if}
    {#each data as app}
      <!-- {#if (app.attributes.Reccomendation == 'support' && app.attributes.LC1 != 'Approved') || (app.attributes.Reccomendation != 'support' && app.attributes.LC1 == 'Approved')} -->
        <li>
          <h2>
            In {app.attributes.MonthChoice}, NPU-{app.attributes.NPU} voted to <span data-outcome="{app.attributes.Reccomendation}">{app.attributes.Reccomendation}</span>

            <strong
              > <a href={app.attributes.ApplicationLink} target="_blank">{app.attributes.NameNumber}</a>
              | {app.attributes.Address}</strong
            >.<br />

            {#if app.attributes.Apptype == 'Mayors Office of Special Events' && app.attributes.LC1 == 'Approved'}
              On {new Date(app.attributes.LC1_date).toLocaleDateString(
                'default',
                { day: 'numeric', month: 'long' },
              )}, the Mayors Office of Special Events <span data-outcome="Approved">issued a permit</span> for this
              application.
            {:else if app.attributes.Apptype == 'Mayors Office of Special Events' && app.attributes.LC1 != 'Approved'}
            Application status is: <span data-outcome={app.attributes.LC1}>{app.attributes.LC1}</span>
            {:else}
              At their {new Date(app.attributes.LC1_date).toLocaleDateString(
                'default',
                { day: 'numeric', month: 'long' },
              )} hearing, the
              {app.attributes.Apptype}
              <span data-outcome="{app.attributes.LC1}">{app.attributes.LC1}</span> this application.
            {/if}

            {#if app.attributes.LC2 != null}
              {#if app.attributes.Apptype == 'License Review Board'}
                <br />
                On {new Date(app.attributes.LC2_date).toLocaleDateString(
                  'default',
                  { day: 'numeric', month: 'long' },
                )}, the License Review Board {app.attributes.LC2} this application.
              {:else}
                <br />
                On {new Date(app.attributes.LC2_date).toLocaleDateString(
                  'default',
                  { day: 'numeric', month: 'long' },
                )}, the City Council Zoning Committee {app.attributes.LC2} this application.
              {/if}
            {/if}

            {#if app.attributes.LC3 != null}
              <br />
              On {new Date(app.attributes.LC3_date).toLocaleDateString(
                'default',
                { day: 'numeric', month: 'long' },
              )}, City Council {app.attributes.LC3} this application.
            {/if}
          </h2>
        </li>
      <!-- {/if} -->
    {/each}
  </ul>
</main>

<style>
  main {
    text-align: left;
    margin: 0 1rem;
    max-width: 1200px;
    font-family: 'GT-Eesti-Regular';
  }
  h2 {
    font-size: 1em;
  }

  li {
    margin: 1.5em;
  }

  span[data-outcome='support'], span[data-outcome='Approved'] {
    color: rgb(0, 169, 0);
  }

  span[data-outcome='nonsupport'], span[data-outcome='Denied'] {
    color: rgb(169, 0, 0);
  }

  span[data-outcome='defer'] {
    color: rgb(169, 132, 0);
  }

  span[data-outcome='WITHDRAWN'] {
    color: rgb(148, 0, 188);
  }
</style>
