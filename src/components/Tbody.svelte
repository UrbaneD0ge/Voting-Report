<script>
  import VoteLine from "./VoteLine.svelte";
  export let item;
</script>

<tbody class="draggable" draggable="true">
  <tr>
    <td class="typeTD"><button class="btn-close"></button>{item.type}</td>
    <td class="applName" contenteditable="true">{item.applName}</td>
    <td class="disp">{item.disposal}</td>
  </tr>
  {#if item.comments}
    <tr>
      <td colspan="3" class="comments" contenteditable="true"
        >{item.comments}</td
      >
    </tr>
  {/if}
<!-- <VoteLine/> -->
</tbody>
