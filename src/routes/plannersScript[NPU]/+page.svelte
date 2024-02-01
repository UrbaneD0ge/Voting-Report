<script>
// get NPU from query params
  import { page } from '$app/stores';

  let npu = $page.url.pathname.slice(-1);

  // console.log(npu);

  export let data;

  data = data.props.data.features;

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
    The <strong>NPUs 50th anniversary “Legacy of Love”</strong> phase kicked off
    January 22, 2024 with an amazing reception and proclamation presentation at City
    Hall during City Council’s full council meeting. We look forward to continuing
    our celebration throughout the year and hope that you will connect with us and
    get involved. Please visit npuatlanta.org to register and learn more about our
    year-long celebration and activities.
  </h2>
  <br />
  <h2>
    Exciting news from NPU University! Check out our upcoming courses and
    register at npuatlanta.org.
    <ul>
      <li>
        <strong>History of Neighborhood Planning Units</strong> will be offered on
        Thursday, February 8th. The course will examine the evolution of NPUs since
        1974.
      </li>
      <li>
        <strong>Zoning Fundamentals I</strong> will be offered on Tuesday, February
        13th. This course is designed to make zoning terms and concepts easier for
        ordinary residents to understand.
      </li>
    </ul>
  </h2>
  <h2>Don't miss out on these valuable learning opportunities!</h2>
  <br />
  <h2>
    The monthly <strong>Atlanta City Studio Book Club</strong> will officially relaunch
    on Tuesday, February 27th. Join us at 6:30 in Committee Room 2 at City Hall,
    55 Trinity Ave.
  </h2>
  <h2>
    <strong
      >Design Awards 2024 – Open Nominations for Community Design Awards</strong
    >
    Nominations are now open for the 2024 Community Design Awards! Nominations can
    be submitted from the public as well as from the NPU body. The deadline for submission
    is 4:00 pm, Thursday, February 29, 2024.
  </h2>

  <hr />
  <h3>Application Updates - NPU-{npu}</h3>
  <ul>
    {#each data as app}
      {#if (app.attributes.Reccomendation == 'support' && app.attributes.LC1 != 'Approved') || (app.attributes.Reccomendation != 'support' && app.attributes.LC1 == 'Approved')}
        <li>
          <h2>
            In {app.attributes.MonthChoice}, NPU-{app.attributes.NPU} voted to {app
              .attributes.Reccomendation}
            <strong
              >{app.attributes.NameNumber}
              | {app.attributes.Address}</strong
            >.<br />

            {#if app.attributes.Apptype == 'Mayors Office of Special Events'}
              On {new Date(app.attributes.LC1_date).toLocaleDateString(
                'default',
                { day: 'numeric', month: 'long' },
              )}, the Mayors Office of Special Events issued a permit for this
              application.
            {:else}
              At their {new Date(app.attributes.LC1_date).toLocaleDateString(
                'default',
                { day: 'numeric', month: 'long' },
              )} hearing, the
              {app.attributes.Apptype}
              {app.attributes.LC1} this application.
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
      {/if}
    {/each}
  </ul>
</main>

<style>
  main {
    text-align: left;
    margin: 0 auto;
    max-width: 1200px;
  }
  h2 {
    font-size: 1em;
  }

  li {
    margin: 1.5em;
  }
</style>
