<script>
  export let data;

  data = data.props.data.features;

  $: console.log(data);

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

<h1>Planners Script</h1>

<p>
  Here are the applications that were not approved by the NPU but were approved
  by the city.
</p>

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

<style>
  h2 {
    font-size: 1em;
  }

  li {
    margin: 1.5em;
  }
</style>
