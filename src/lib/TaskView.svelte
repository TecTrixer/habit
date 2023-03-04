<script lang="ts">
  import { pb } from "$lib/auth";
  import type { Task, Streak } from "$lib/types";
  import { onMount, onDestroy } from "svelte";
  let tasks: Task[] = [];
  let streaks: Streak[] = [];
  onMount(async () => {
    try {
      const task_res = await pb
        .collection("tasks")
        .getList(1, 25, { sort: "-created" });
      for (let record of task_res.items) {
        const new_task: Task = {
          description: record.description,
          taskId: record.id,
          userId: record.user,
        };
        tasks = [...tasks, new_task];
      }
      const streak_res = await pb
        .collection("streaks")
        .getList(1, 25, { sort: "-created" });
      for (let record of streak_res.items) {
        const new_streak: Streak = {
            streakId: record.id,
            userId: record.user,
            taskId: record.task,
            streak: record.streak,
        };
        streaks = [...streaks, new_streak];
      }
    } catch (e) {
      console.log(e);
    }
    pb.collection("tasks").subscribe("*", (data) => {
      if (data.action === "create") {
        const new_task: Task = {
          description: data.record.description,
          taskId: data.record.id,
          userId: data.record.user,
        };
        tasks = [...tasks, new_task];
      } else if (data.action === "delete") {
        const index = tasks.findIndex((val) => {
          return val.taskId === data.record.id;
        });
        if (index > -1) {
          tasks.splice(index, 1);
          tasks = tasks;
        }
      } else if (data.action === "update") {
        const index = tasks.findIndex((val) => {
          return val.taskId === data.record.id;
        });
        const new_task: Task = {
          description: data.record.description,
          taskId: data.record.id,
          userId: data.record.user,
        };
        if (index > -1) {
          tasks[index] = new_task;
        }
      }
    });
    pb.collection("streaks").subscribe("*", (data) => {
      if (data.action === "create") {
        const new_streak: Streak = {
            streakId: data.record.id,
            userId: data.record.user,
            taskId: data.record.task,
            streak: data.record.streak,
        };
        streaks = [...streaks, new_streak];
      } else if (data.action === "delete") {
        const index = streaks.findIndex((val) => {
          return val.streakId === data.record.id;
        });
        if (index > -1) {
          streaks.splice(index, 1);
          streaks = streaks;
        }
      } else if (data.action === "update") {
        const index = streaks.findIndex((val) => {
          return val.streakId === data.record.id;
        });
        const new_streak: Streak = {
            streakId: data.record.id,
            userId: data.record.user,
            taskId: data.record.task,
            streak: data.record.streak,
        };
        if (index > -1) {
          streaks[index] = new_streak;
        }
      }
    });
  });

  onDestroy(() => {
    pb.collection("tasks").unsubscribe();
  });
</script>

<div class="text-center mb-10 text-xl">
  {#each tasks as task}
    <p class="my-2">{task.description}</p>
  {/each}
  {#each streaks as task}
    <p class="my-2">{task.streak}</p>
  {/each}
</div>
