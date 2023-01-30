import type { Tick } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
// Deadline until next tick needs to be registered 24h
const DEADLINE = (1000 * 60 * 60 * 24);
const prisma = new PrismaClient();

export async function next_deadline(user: string): Promise<Date | null> {
  const res = await prisma.tick.findFirst({ where: { user: user }, orderBy: { time: "desc" }, select: { time: true } });
  if (!res) {
    return null;
  }
  const { time } = res;
  // If last tick is older than deadline it is invalid
  const now = new Date();
  const diff: Date = new Date(now.getTime() - time.getTime());
  if (diff.getTime() > DEADLINE) {
    return null;
  }
  // Last tick is not older than deadline => return next next_deadline
  const newDate = new Date(time.getTime() + DEADLINE);
  console.log(diff);
  return newDate;
}

export async function tick(user: string) : Promise<Tick> {
  return await prisma.$transaction(async (client) => {
    const first: boolean = await async function() {
      const res = await client.tick.findFirst({ where: { user: user }, orderBy: { time: "desc" }, select: { time: true } });
      if (!res) {
        return true;
      }
      const { time } = res;
      // If last tick is older than deadline it is invalid
      const now = new Date();
      const diff: Date = new Date(now.getTime() - time.getTime());
      return diff.getTime() >= DEADLINE
    }();
    return await client.tick.create({ data: { user: user, first: first } });
  });
}

export async function streak_amount(user: string): Promise<number> {
  const res = await prisma.tick.findFirst({ where: { user: user, first: true }, select: { time: true }, orderBy: { time: "desc" } });
  if (!res) {
    return 0;
  }
  const { time } = res;
  const now = new Date();
  const diff = Math.floor((now.getTime() - time.getTime()) / (DEADLINE)) + 1;
  return diff;
}
