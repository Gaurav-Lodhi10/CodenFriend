const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function cleanupOrphanedRooms() {
  try {
    console.log('Starting cleanup of orphaned rooms...');
    
    // Find all rooms
    const allRooms = await prisma.room.findMany({
      select: {
        id: true,
        userId: true,
      },
    });
    
    console.log(`Found ${allRooms.length} total rooms`);
    
    // Find all user IDs
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
      },
    });
    
    const validUserIds = new Set(allUsers.map(user => user.id));
    console.log(`Found ${validUserIds.size} valid users`);
    
    // Find orphaned rooms (rooms with userId that doesn't exist)
    const orphanedRooms = allRooms.filter(room => !validUserIds.has(room.userId));
    
    console.log(`Found ${orphanedRooms.length} orphaned rooms`);
    
    if (orphanedRooms.length > 0) {
      // Delete orphaned rooms
      const deleteResult = await prisma.room.deleteMany({
        where: {
          id: {
            in: orphanedRooms.map(room => room.id),
          },
        },
      });
      
      console.log(`Deleted ${deleteResult.count} orphaned rooms`);
    } else {
      console.log('No orphaned rooms found');
    }
    
    console.log('Cleanup completed successfully');
  } catch (error) {
    console.error('Error during cleanup:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the cleanup
cleanupOrphanedRooms(); 