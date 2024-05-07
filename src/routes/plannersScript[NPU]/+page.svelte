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
        app.attributes.Apptype = 'Board of Zoning Adjustments';
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
<h2>May 2024</h2>
<h3>Please see links below for more information about the items your planner reported at the NPU meeting.</h3>
<ul>
    <li>
    <p>May marks the beginning of the “Love Thy Neighbor” phase of the NPU system’s 50<sup>th</sup> anniversary. This spring and summer, we will celebrate Atlanta’s neighborhoods and neighbors. To kick off Phase 2, the Department of City Planning is collaborating with the Atlanta Cycling Festival and ATLDOT to co-host a bike ride on Friday, May 17. For more info about this and other events, text <b>NPUATL </b>to <b>24251 </b>or visit <a href="http://npuatlanta.org/" target="_blank"><b>NPUAtlanta.org</b></a>.</p>
    </li>
    <li>
    <p>Please join us on Monday, May 20<sup>th</sup>, 6:30pm at Habitat for Humanity | 824 Memorial Drive - for the first of several meetings to review and discuss the <b><a href="https://atlzoning.com/" target="_blank">Zoning 2.0</a></b> update.</p>
    </li>
    <li>
    <p>The Department of City Planning is continuing to update <a href="https://www.atlantaforall.com/" target="_blank"><b>Plan_A</b></a>, Atlanta’s Comprehensive Development Plan. DCP is hosting workshops from mid-May through mid-June. We invite you to attend the workshop in your NPU or an adjacent NPU.</p>
    </li>
    <li>
    <p><b>NPU University</b> courses coming up in June are:<br>
      <ul>
    <li><p><i>“ATLDOT Vision Zero – Building Community Champions for Safe Streets” </i>on Thursday, June 13<sup>th</sup>,</p></li>
    <li><p><i>“Neighborhood Empowerment Workshop”</i> on Saturday, June 15<sup>th</sup>, and</p></li>
    <li><p><i>“Urban Plan Academy”</i> on Saturday, June 22<sup>nd</sup>.</p></li>
    <br>
    <p>Register at <a href="https://www.npuatlanta.org/npuuniversity" target="_blank">NPUAtlanta.org</a>!</p>
  </ul>
    </li>
    <li>
    <p>The Office of Design in the Department of City Planning is reading books to explore what lies behind the creation of Atlanta’s physical design and the City’s official plans. Join us to discuss how ideas and examples related to historic preservation, planning, and public space influence the city’s physical design through the lens of Atlanta City Design: Aspiring to the Beloved Community. Our focus and the topics change monthly and in person on the last Tuesday of every month at City Hall unless otherwise noted.</p>

    <ul>
        <li>
        <p>What: May 2024 Atlanta City Studio Book Club Meeting</p>
        </li>
        <li>
        <p>When: Wednesday, May 22<sup>nd</sup>, 2024, at 6:30 PM</p>
        </li>
        <li>
        <p>Where: Committee Room 2 - City Hall, 55 Trinity Ave, Atlanta, GA 30303</p>
        </li>
        <li>
        <p>Why: The history of segregation in state and city park design is still visible in the South today. In recognition of <a href="https://www.nps.gov/subjects/nationalregister/preservation-month.htm" target="_blank">Preservation Month</a>, when events occur to "promote historical places, instill national and community pride, promote heritage tourism, and show the social and economic benefits of historic preservation” across the country, the Atlanta City Studio Book Club will explore <a href="https://lalh.org/books/featured/landscapes-exclusion/" target="_blank">LANDSCAPES OF EXCLUSION: State Parks and Jim Crow in the American South</a> by William E. O’Brien. Members of the <a href="https://www.atlantaga.gov/government/departments/city-planning/historic-preservation" target="_blank">Historic Preservation Studio</a> will provide local context; they will show how Atlanta fits in the broader history, referencing the Future Places Project 2019 Survey of City of Atlanta Parks and their resources, called <a href="https://www.atlfutureplaces.com/every-park-tells-a-story" target="_blank">Every Park Tells a Story: City of Atlanta Parks Historic Resource Survey</a>.</p>
      </li>
    </ul> <br>
      <p>
        For details on the Atlanta City Studio Book Club, visit <a href="https://www.atlcitystudio.org/acs-book-club" target="_blank">our website</a>. If you need something else ACS Book Club related, please email Liza Mueller, the organizer, at <a href="mailto:emueller@atlantaga.gov?subject=ACS Book Club Question" target="_blank">emueller@atlantaga.gov</a>.
      </p>
  </li>
    <li>
    <p>The Atlanta Urban Design Commission’s annual <b>Design Awards</b> will be held on May 31<sup>st</sup> at 6:00 pm in the City Hall Atrium. The event is free to the public.</p>
    </li>
</ul>
<br>

  <hr />
  <h3>Application Updates - NPU-{npu}</h3>
  <br />
  <h2>
    Lastly, I have the application updates for NPU-{npu}!
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

            <b
              > <a href={app.attributes.ApplicationLink} target="_blank">{app.attributes.NameNumber}</a>
              | {app.attributes.Address}</b
            >.<br />

            {#if app.attributes.Apptype == 'Mayors Office of Special Events' && app.attributes.LC1 == 'Approved'}
              On {new Date(app.attributes.LC1_date).toLocaleDateString(
                'default',
                { day: 'numeric', month: 'long' },
              )}, the Mayor’s Office of Special Events <span data-outcome="Approved">issued a permit</span> for this
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
  <br>
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

  /* Select ul elements inside another ul */
  ul ul li, ul ul p {
    margin-block: 0;
  }

  /* .planA {
    color: #f36810;
  } */
</style>
