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

  function copyLink() {
    let thisButton = this.parentElement.querySelector('a');
    navigator.clipboard.writeText(thisButton.href);
    console.log(thisButton.href);
    this.innerText = 'Copied!';
    this.style.backgroundColor = 'black';
    this.style.color = 'white';
    this.style.borderColor = 'white';
    setTimeout(() => {
      this.innerText = 'Copy Link';
      this.style.backgroundColor = 'buttonface';
      this.style.color = 'black';
      this.style.borderColor = 'black';
    }, 1000);
  }
</script>

<!-- set page title -->
<svelte:head>
  <title>{npu} Planners Script</title>
</svelte:head>

<main>
  <h1>NPU-{npu} Planners Script</h1>
<h2><span style="color: red;">This version of the Planner's Report script is *EXPERIMENTAL*. Please refer to the emailed version if possible!</span></h2>
<h3>Planners: Please read the updates below and paste the links in the Zoom chat.</h3>
<h2>August 2024</h2>
<h2><b>First, the updates from NPU-{npu}'s previous voting items.</b></h2>
<ul>
  {#if data.length == 0}
    <br />
    <h2><i>No application updates to report.</i></h2>
  {/if}
  {#each data as app}
    <!-- {#if app.attributes.LC1 != 'HELD'} -->
      <li>
        <h2>
          In {app.attributes.MonthChoice}, NPU-{app.attributes.NPU} voted to <span data-outcome="{app.attributes.Reccomendation}">{app.attributes.Reccomendation}</span>

          <b> <a href={app.attributes.ApplicationLink} target="_blank">{app.attributes.NameNumber}</a>
            | {app.attributes.Address}</b>.

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
<hr>
<h2><b>Next, the updates from the Planning Department:</b></h2>
<ol>
  <li>
    <p>As the <b>NPU’s 50<sup>th</sup> anniversary celebration</b> continues, September marks the beginning of our final phase: Planning Atlanta Together. Join us on a bike ride to commemorate the 50<sup>th</sup> anniversary of the NPU system! We’ll pedal around Hartsfield-Jackson Atlanta International Airport, ending at Morehouse College, Maynard Jackson’s alma mater. Meet us on Saturday, October 5<sup>th</sup> at 9:30 AM at the College Park MARTA Station to join the ride.
      <br><br>
      Join us on Saturday, November 9<sup>th</sup> from 11:00 AM to 4:00 PM for the <b>Love Thy Neighbor(hood) Festival</b> at Historic Fourth Ward Park. This vibrant celebration of Atlanta’s neighborhoods is our final event of the year -- honoring the 50<sup>th</sup> anniversary of the NPU system!</p>
  </li>
  <li>
    <p>These next two are especially important, and in fact, they’re the reason NPUs meet every month. The Department of City Planning is continuing to update <b>Plan A: Atlanta’s Comprehensive Development Plan</b>. The plan sets forth the vision, goals, policies, and actions for growth and development in Atlanta. We'll be hosting public meetings and pop-ups across the city between October and February. We’ll post schedule updates and information at <a href='https://www.atlantaforall.com/'>AtlantaForAll.com</a></p>
  </li>
  <li>
    <p>Of equal importance is the work we are doing to rewrite our zoning code. We released the new <b>ATL Zoning 2.0</b> Ordinance Module I “Discussion Draft” for public review in May. This module includes draft standards for Form & Frontage Districts and Use Districts. Revisions based on comments received will be posted on our website in October. Module II - Development Standards will be released on December 4<sup>th</sup>. Comments on ATL Zoning 2.0 will be received on all modules through March 31<sup>st</sup> at <a href='https://atlzoning.com/'>ATLzoning.com</a></p>
  </li>
  <li>
    <p>Join the <b>Atlanta City Studio Book Club</b> on Tuesday, October 29<sup>th</sup> from 6:30 to 8:30 PM to discuss <span style='text-decoration: underline;'>Keeping the Chattahoochee: Reviving and Defending a Great Southern River</span>.</p>
  </li>
  <li>
    <p>As a reminder, <b><a href='https://www.npuatlanta.org/npuuniversity'>NPU University</a></b> courses are free to all Atlanta residents. Upcoming courses are:</p>
    <ul>
      <li>Understanding Workforce Housing and Affordability, and</li>
      <li>Urban Plan Academy</li>
    </ul>
  </li>
  <li>Please <a href="https://arcg.is/1y050T0" target="_blank">follow this link</a> to a brief survey in the chat so you can <strong>tell us about your experience with your NPU</strong>. Please take a few minutes to complete the survey, which will help us identify opportunities to strengthen the NPU system.</li>
</ol>
<h3>Links to post:</h3>
  <br>
  <div style="display: flex;justify-content:space-around">
    <h5>
      <a
        href="https://arcg.is/1y050T0"
        target="_blank">NPU Survey</a
      ><br>
      <button id="copySurvey" on:click={copyLink}>Copy Link</button>
    </h5>
  <h5>
    <a
      href="https://www.atlantaga.gov/government/departments/city-planning/neighborhood-planning-units/updates"
      target="_blank">Updates Page</a
    ><br>
    <button id="copyLink" on:click={copyLink}>Copy Link</button>
  </h5>
  <h5>
    <a
      href="https://coaplangis.maps.arcgis.com/apps/dashboards/a7ab4e0bb5034b219c63a160a7538708#&NPU={npu}"
      target="_blank">Applications Table</a
    ><br>
    <button id="copyApp" on:click={copyLink}>Copy Link</button>
  </h5>
</div>
</main>

<style>
  button {
    border-radius: 5px;
  }
  main {
    text-align: left;
    margin: 1rem 6rem;
    max-width: 1200px;
    font-family: Inter, 'GT-Eesti-Regular';
  }
  h2 {
    font-size: 1em;
  }

  h5 {
    text-align: center;
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
  ol ul li, ol ul p, ul ol p {
    margin-block: 0;
  }

  li p {
    margin-block: 0;
  }

  /* .planA {
    color: #f36810;
  } */
</style>
