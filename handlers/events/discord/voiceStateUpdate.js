module.exports = (oldMember, newMember) => {
  let oldVoice = oldMember.voiceChannel;
  let newVoice = newMember.voiceChannel;

  if (newVoice && !oldVoice) return oldMember.client.emit("moderationLog", oldMember.guild, "voicejoin", false, [newMember.user, newVoice]);
  if (oldVoice && !newVoice) return oldMember.client.emit("moderationLog", oldMember.guild, "voiceleave", false, [newMember.user, oldVoice]);
  if (oldVoice && newVoice && oldVoice.id !== newVoice.id) return oldMember.client.emit("moderationLog", oldMember.guild, "voiceswitch", false, [newMember.user, oldVoice, newVoice]);
};
