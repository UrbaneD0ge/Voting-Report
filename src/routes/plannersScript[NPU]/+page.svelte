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
<h2>November 2024</h2>
<h3>Please see links below for more information about the items your planner reported at the NPU meeting.</h3>
<ol>
    <li>
    <p>As we wrap up the <b>50th anniversary of the Neighborhood Planning Unit system</b> with all of you, the Department of City Planning wants to express our sincere gratitude for everyone’s partnership and participation. Your engagement has been invaluable in making this a truly memorable year! We’ll be sharing some of the special moments we captured on our social media in the upcoming weeks, so be sure to stay connected and follow us on social media @NPUAtlanta.</p>
    </li>
    <li>
    <p>The <b>2025 Community Impact Grant</b> Information Session will be held on Wednesday, December 11<sup>th</sup> from 6:00 p.m. to 7:00 p.m. via Zoom. Attendance to this session is required for NPU chairs or project managers applying for funding to complete impactful community projects in 2025. More information on the <a href="https://www.atlantaga.gov/government/departments/city-planning/neighborhood-planning-units/community-impact-grant-program" target="_blank">Community Impact Grant</a> page.</p>
    </li>
    <li>
    <p>The Department of City Planning is continuing to update <b>Plan A: Atlanta’s Comprehensive Development Plan</b>. The plan sets forth the vision, goals, policies, and actions for growth and development in Atlanta. We’ll continue hosting public meetings and pop-ups across the city through February. We’ll post schedule updates and information at&nbsp;<a href="https://www.atlantaforall.com/">AtlantaForAll.com</a></p>
    </li>
    <li>
    <p>The work we’re doing to rewrite our zoning code is equally important. We released the new <b>ATL Zoning 2.0</b>&nbsp;Ordinance Module I “Discussion Draft” for public review in May. This module includes draft standards for Form &amp; Frontage Districts and Use Districts. Revisions based on comments received are posted on our website. Module II - Development Standards will be released on December 4<sup>th</sup>. You may continue to submit comments on <b>all modules</b>&nbsp;through March 31<sup>s</sup><sup>t</sup>&nbsp;at&nbsp;<a href="https://atlzoning.com/">ATLzoning.com</a></p>
    </li>
    <li>
    <p>The <b>Atlanta City Studio Book Club</b> will meet on Thursday, November 21<sup>st</sup> to discuss <a href="https://islandpress.org/books/inclusive-transportation#desc" target="_blank"><i>Inclusive Transportation: A Manifesto for Repairing Divided Communities</i></a>. The book is described as <i>“A Vision for Change and a New Era of Transportation Planning.”</i> We will also discuss the Vision Zero Action Plan, the Plan A Transportation Chapter, and the upcoming Comprehensive Transportation Plan with ATLDOT representatives.</p>
    </li>
    <li>Please&nbsp;<a href="https://arcg.is/1y050T0" target="_blank">follow this link</a>&nbsp;to a brief survey in the chat so you can&nbsp;<strong>tell us about your experience with your NPU</strong>.&nbsp;Please take a few minutes to complete the survey, which will help us identify opportunities to strengthen the NPU system.&nbsp;</li>
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
