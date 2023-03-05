<script lang="ts">
  import { pb } from "$lib/auth";
  import type { TaskWithStreak } from "$lib/types";
  import { onMount, onDestroy } from "svelte";
  import TaskView from "$lib/TaskView.svelte"
  let tasks: TaskWithStreak[] = [];
  onMount(async () => {
    try {
      const task_res = await pb
        .collection("tasks")
        .getList(1, 25, { sort: "-created" });
      for (let record of task_res.items) {
        const new_task: TaskWithStreak = {
          description: record.description,
          taskId: record.id,
          userId: record.user,
          streak: -1,
        };
        tasks = [...tasks, new_task];
      }
      const streak_res = await pb
        .collection("streaks")
        .getList(1, 25, { sort: "-created" });
      for (let record of streak_res.items) {
        const index = tasks.findIndex((val) => {return val.taskId === record.task});
        if (index > -1) {
          tasks[index].streak = record.streak;
          tasks = tasks;
        }
      }
      tasks = tasks
    } catch (e) {
      console.log(e);
    }
    pb.collection("tasks").subscribe("*", (data) => {
      if (data.action === "create") {
        const new_task: TaskWithStreak = {
          description: data.record.description,
          taskId: data.record.id,
          userId: data.record.user,
          streak: -1,
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
        const new_task: TaskWithStreak = {
          description: data.record.description,
          taskId: data.record.id,
          userId: data.record.user,
          streak: tasks[index].streak
        };
        if (index > -1) {
          tasks[index] = new_task;
        }
      }
    });
    pb.collection("streaks").subscribe("*", (data) => {
      if (data.action === "create") {
        const index = tasks.findIndex((val) => {return val.taskId === data.record.task});
        if (index > -1) {
          tasks[index].streak = data.record.streak;
          tasks = tasks;
        }
      } else if (data.action === "delete") {
        const index = tasks.findIndex((val) => {return val.taskId === data.record.task});
        if (index > -1) {
          tasks[index].streak = -1;
          tasks = tasks;
        }
      } else if (data.action === "update") {
        const index = tasks.findIndex((val) => {return val.taskId === data.record.task});
        if (index > -1) {
          tasks[index].streak = data.record.streak;
          tasks = tasks;
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
    <TaskView task={task}/>
  {/each}
</div>
