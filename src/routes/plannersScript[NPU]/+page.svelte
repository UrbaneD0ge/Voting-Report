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
<ul>
  <li>
    <p>As the <b>NPU’s 50th anniversary celebration</b> continues, September marks the beginning of our final phase: Planning Atlanta Together. In this phase, we will begin discussing the future of our NPU system and how we can empower neighborhoods to strengthen the NPUs. Last month, nearly 100 Sylvan Hills residents joined us for our first Love Thy Neighbor Block Party, and we are looking forward to hosting the next one in Adamsville in NPU-H on September 14<sup>th</sup>. For more info about this and other events, text <b>NPUATL</b> to <b>24251</b>.</p>
  </li>
  <li>
    <p>These next two are especially important, and in fact, it’s the reason NPUs meet every month. The Department of City Planning is continuing to update <b>Plan A: Atlanta’s Comprehensive Development Plan</b>. The plan sets forth the vision, goals, policies, and actions for growth and development in Atlanta. We will be hosting public meetings and pop-ups across the city between October and February. We’ll post schedule updates and information on how to participate at <a href='https://www.atlantaforall.com/'>AtlantaForAll.com</a>.</p>
  </li>
  <li>
    <p>Of equal importance is the work we are doing to rewrite our zoning code. We released the new <b>ATL Zoning 2.0</b> Ordinance Module I “Discussion Draft” for public review on May 20<sup>th</sup>. This module includes draft standards for Form & Frontage Districts and Use Districts. Revisions based on comments received will be posted on our website in October. Module II - Development Standards will be released on December 4<sup>th</sup>. Comments on ATL Zoning 2.0 will be received on all modules through March 31<sup>st</sup> at <a href='https://atlzoning.com/'>ATLzoning.com</a>.</p>
  </li>
  <li>
    <p>The <b>Atlanta City Studio</b> is celebrating its official reopening on Monday, September 30<sup>th</sup>. This time, in South Downtown on Historic Hotel Row! Please drop by anytime between 12 noon and 6:30 PM at 235 Mitchell Street SW, Suite 103.</p>
  </li>
  <li>
    <p>Do you know how city design and cemetery history are related? Have you heard of the Atlanta Cemetery Network? Join the Atlanta City Studio Book Club on September 24<sup>th</sup> to discuss <a href='https://fulcolibrary.bibliocommons.com/v2/record/S171C1486426'>Over My Dead Body: Unearthing the Hidden History of America’s Cemeteries</a> and learn how city design is related to and developed around cemetery history and the Atlanta Cemetery Network’s efforts to preserve cemetery sites in the city.</p>
  </li>
  <li>
    <p>DCP is partnering with the Keep Atlanta Beautiful Commission to invite you to <b>Trash Bash ATL</b>, a citywide initiative in support of World Cleanup Day. To participate, just <a href="https://adopt-a-road-atlhubgis.hub.arcgis.com/pages/trash-bash-2024">visit the website</a> and schedule a clean-up event for your community on September 20<sup>th</sup> or 21<sup>st</sup>. This friendly competition among NPUs is a fantastic opportunity to show your community spirit and contribute to a cleaner, more beautiful Atlanta.</p>
  </li>
  <li>
    <p>As a reminder, <b><a href='https://www.npuatlanta.org/npuuniversity'>NPU University</a></b> courses are free to all Atlanta residents. Upcoming courses are:</p>
    <ul>
      <li class="npuu">Code Enforcement Academy</li>
      <li class="npuu">Parliamentary Procedures II</li>
      <li class="npuu">Atlanta Community Engagement Playbook</li>
      <li class="npuu">Density Matters and Neighborhood Revitalization</li>
      <li class="npuu">Intro to Geographic Information Systems (GIS), and</li>
      <li class="npuu">Understanding Workforce Housing and Affordability</li>
    </ul>
  </li>
</ul>
<h3>Links to post:</h3>
  <br>
  <div style="display: flex;justify-content:space-around">
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
  </h5></div>
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

  .npuu{
    margin: 0;
    margin-bottom: 0;
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
  ol ul li, ol ul p {
    margin-block: 0;
  }

  /* .planA {
    color: #f36810;
  } */
</style>
