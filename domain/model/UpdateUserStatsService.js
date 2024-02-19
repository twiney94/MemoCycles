async function updateStats(userId, success) {
  const userStats = await UserStats.findOne({ userId });
  if (!userStats) {
    // Créer une nouvelle entrée si nécessaire
  }
  userStats.cardsReviewedToday += 1;
  if (success) {
    // Mettre à jour le taux de réussite
  }
  await userStats.save();
}