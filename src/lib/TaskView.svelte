<script lang="ts">
import type { TaskWithStreak } from "./types";
export let task: TaskWithStreak;
</script>

<div class="flex flex-col items-center my-10">
  <div class="card w-96 bg-teal-700 text-primary-content shadow-xl">
  <div class="card-body">
    <h2 class="card-title underline">Task</h2>
    <p>{task.description}</p>
    <p>Streak: {task.streak}</p>
    <div class="card-actions justify-end">
    <button class="btn-secondary btn">Done</button>
    </div>
  </div>
</div>
</div>
