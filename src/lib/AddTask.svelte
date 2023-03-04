<script lang="ts">
  import { pb } from "$lib/auth";
  let description: string;
  async function submit() {
    if (!description || description === "") return;

    const userId = pb?.authStore?.model?.id;
    if (!userId) return;

    const data = {
      description: description,
      user: userId,
    };

    pb.collection("tasks")
      .create(data)
      .then((_) => {})
      .catch((e) => {
        console.log(e);
      });
    description = "";
  }
</script>

<div class="flex flex-col items-center">
  <p class="text-center text-3xl mb-10 underline">Add a Task here</p>
  <form class="form-control" on:submit={submit}>
    <div>
      <label class="input-group">
        <span class="ml-auto">Description</span>
        <input
          type="text"
          bind:value={description}
          placeholder="e.g. do sport once a day"
          class="input input-bordered outline-none"
        />
      </label>
    </div>
    <button class="btn mx-auto mt-5 btn-primary">submit</button>
  </form>
</div>
