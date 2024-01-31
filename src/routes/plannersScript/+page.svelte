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
    // TODO: switch case reformat AppType
  });
</script>

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
          >.<br /> At their {new Date(
            app.attributes.LC1_date,
          ).toLocaleDateString('default', { day: 'numeric', month: 'long' })} meeting,
          the
          {app.attributes.Apptype}
          {app.attributes.LC1} this application.
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
