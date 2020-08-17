const db = require('../database')

class Message {
  static insert(message) {
    return db('messages').insert(message)
  }

  static async markMessageAsReceived(messageUuid) {
    await db('messages')
      .where('uuid', messageUuid)
      .update({ received: true })
  }

  static async markAllMessagesAsReceived(userId, contact_id = null) {
    const query = db('messages')
      .where('recipient_id', userId)
      .where('received', false)

    if (contact_id) {
      query.where('sender_id', contact_id)
    }

    await query.update({ received: true })
  }

  static async countNotReceivedMessages(userId) {
    return await db('messages')
      .select('sender_id')
      .count('uuid as count')
      .where('recipient_id', userId)
      .where('received', false)
      .groupBy('sender_id')
  }
}

module.exports = Message
