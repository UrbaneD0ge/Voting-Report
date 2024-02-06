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
    We have a lot of really important information to share this month, so thank
    you for being patient!
    <ol>
      <li>
        Last month, we kicked off the 50th Anniversary of the NPU system with a
        proclamation from City Council! In phase one: we are commemorating the
        legacy of Maynard Jackson and the historic trailblazers of the NPU
        system. We will continue our celebration all year long and we hope that
        you will celebrate with us!
      </li>
      <li>
        Speaking of celebrating our 50th Anniversary, on February 8th, NPU
        University is hosting a brand-new class, walking through Atlanta’s
        history leading up to the NPU system, and its evolution since then. We
        also have Zoning Fundamentals coming up on February 13th for those who
        want to learn the basics or need a refresher.
      </li>
      <li>
        The Department of City Planning is leading an 18-month planning process
        to update Plan_A: Atlanta’s Comprehensive Development Plan. This effort
        will include pop-ups, community workshops, and other events across the
        city. You are invited to the in-person kick-off event on February 29th,
        from 5 p.m. to 7 p.m. at Greenbriar Mall. At the event, the Department
        will launch an online survey and mapping tool to gather public input.
        More information about participating, including community workshops and
        ways to meet with our planners will be posted at www.AtlantaForAll.com.
      </li>
      <li>
        Nominations are now open for the Community Design Awards! You can submit
        a nomination individually or as an NPU body. The deadline for submission
        is 4:00 pm on Thursday, February 29th.
      </li>
      <li>
        You can submit capital improvement project ideas for your neighborhood
        in the submission portal now through March 8th.
      </li>
    </ol>
    Please click on the link I’ve dropped in the chat for more information on these
    updates.
  </h2>

  <hr />
  <h3>Application Updates - NPU-{npu}</h3>
  <br />
  <h2>
    I have one last thing to report. In May of 2023, we began a pilot program to
    provide updates on your voting items as they progress through the approval
    process. We’re excited to roll this out to all NPUs citywide and here is the
    first application update for NPU-{npu}!
  </h2>
  <ul>
    {#if data.length == 0}
      <br />
      <h2><i>No application updates to report.</i></h2>
    {/if}
    {#each data as app}
      {#if (app.attributes.Reccomendation == 'support' && app.attributes.LC1 != 'Approved') || (app.attributes.Reccomendation != 'support' && app.attributes.LC1 == 'Approved')}
        <li>
          <h2>
            In {app.attributes.MonthChoice}, NPU-{app.attributes.NPU} voted to
            {app.attributes.Reccomendation}
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
