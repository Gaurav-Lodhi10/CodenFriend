import { db } from "@/db";
import { getSession } from "@/lib/auth";

export async function getRooms(search: string | undefined) {
  const where = search
    ? {
        tags: {
          contains: search,
          mode: "insensitive" as const,
        },
      }
    : {};

  const rooms = await db.room.findMany({
    where,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
  });
  
  // Handle rooms where user might be null
  return rooms.map(room => ({
    ...room,
    user: room.user || {
      id: room.userId,
      name: "Unknown User",
      email: "unknown@example.com",
      image: null,
    },
  }));
}

export async function getUserRooms() {
  const session = await getSession();
  if (!session) {
    throw new Error("User not authenticated");
  }
  
  const rooms = await db.room.findMany({
    where: {
      userId: session.user.id
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    }
  });

  return rooms;
}

export async function getRoom(roomId: string) {
  return await db.room.findFirst({
    where: {
      id: roomId
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    }
  });
}

export async function deleteRoom(roomId: string) {
  await db.room.delete({
    where: {
      id: roomId
    }
  });
}

export async function createRoom(
  roomData: {
    name: string;
    description?: string;
    tags: string;
    githubRepo?: string;
  },
  userId: string
) {
  const room = await db.room.create({
    data: {
      ...roomData,
      userId
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    }
  });
  return room;
}

export async function editRoom(roomData: {
  id: string;
  name: string;
  description?: string;
  tags: string;
  githubRepo?: string;
  userId: string;
}) {
  const room = await db.room.update({
    where: {
      id: roomData.id
    },
    data: {
      name: roomData.name,
      description: roomData.description,
      tags: roomData.tags,
      githubRepo: roomData.githubRepo
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    }
  });
  return room;
}
