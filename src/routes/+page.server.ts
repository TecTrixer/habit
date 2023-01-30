import type { Actions } from './$types';
import { next_deadline, tick, streak_amount } from '../utils/database';
 
export const actions = {
  default: async (event) => {
    const data = await event.request.formData();
    const form= data.get("name");
    if (form) {
      const name = form.toString();
      console.log(name);
      // TODO: Design these functions so that they don't do findFirst multiple times
      const res = await tick(name);
      console.log(res);
      const deadline = await next_deadline(name);
      const streak = await streak_amount(name);
      console.log(deadline, streak);
      return { deadline: deadline, streak: streak };
    }
  }
} satisfies Actions;