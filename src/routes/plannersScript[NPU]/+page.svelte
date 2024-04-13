<script>
  // get NPU from query params
  import { page } from '$app/stores';
  let npu = $page.url.pathname.slice(-1);
  export let data;

  data = data.props.data.features;

  // console.log(data);

  // replace the month number with the month name
  data?.forEach((app) => {
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

<!-- set page title -->
<svelte:head>
  <title>{npu} Planners Script</title>
</svelte:head>

<main>
  <h1>NPU-{npu} Planners Script</h1>
<h2><span style="color: red;">This version of the Planner's Report script is *EXPERIMENTAL*. Please refer to the emailed version if possible!</span></h2>

  <h2>
    We have a lot of really important information to share this month, so thank
    you for being patient!
    <ul>
      <li>A heartfelt thank you to everyone who joined us for a fantastic Legacy Week honoring the late Mayor Maynard H. Jackson, Jr.! To stay informed about this and upcoming “Love Thy Neighbor” events, text NPUATL to 24251 or visit NPUAtlanta.org.
</li>
<li>
      Please join us on Monday, May 20<sup>th</sup>, 6:30pm at Habitat for Humanity | 824 Memorial Drive - for the first of several meetings to review and discuss the Zoning 2.0 update.
    </li>
    <li>
      As part of the update to Atlanta’s Comprehensive Development Plan, Plan_A Open Houses are continuing through mid-April. We invite you to attend one close to you or to visit a pop-up and help us Plan Atlanta together! Visit AtlantaforAll.com to see the dates and locations and to learn more about Plan A.

      There’s a Community Open House happening on [date] at [location] in NPU-_, get details and RSVP at AtlantaForAll.com.
    </li>
    <li>
      NPU University courses coming up are:
      <ul>
        <li style="margin-block: 0;">“City Built for the Future: Climate Action in Atlanta” on Wednesday, April 3rd;</li>
        <li style="margin-block: 0;">“NPU 101: How does the NPU system Work” on Thursday, April 11th and</li>
        <li style="margin-block: 0;">“Introduction to Invest Atlanta” on Tuesday, April 30th.</li>
      </ul>
      <br>
      Register at NPUAtlanta.org!
    </li>
    <li>
      The April meeting of the Atlanta City Studio Book Club will be on Tuesday the 30th, details at the link in the chat.
    </li>
    <li>
      Help us celebrate the best of Atlanta! Select a location, initiative, or individual actively working towards creating a more vibrant and livable city to be recognized with a Community Design Award.  Your NPU is being asked to nominate and vote today for a Community Design Awards recipient.
    </li>
  </ul>
    Please click on the link I’ve dropped in the chat for more information on these
    updates.
  </h2>

  <hr />
  <h3>Application Updates - NPU-{npu}</h3>
  <br />
  <h2>
    I have one last thing to report. Last year, we began a pilot program to
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
    margin: 1rem 6rem;
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

  span[data-outcome='defer'],span[data-outcome='HELD'] {
    color: rgb(169, 132, 0);
  }

  span[data-outcome='WITHDRAWN'] {
    color: rgb(148, 0, 188);
  }
</style>
