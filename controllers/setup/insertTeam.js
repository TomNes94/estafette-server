const { makeid } = require("./makeid");

module.exports = async (req, res) => {
  const id = makeid(12);
  const query = `INSERT INTO teams(
    team_name, total_distance, match_id, created_at, is_started, is_finished, updated_at, distance_covered, invitation_key, total_participants_finished)
    VALUES ('$1', 70000, 2, current_timestamp, false, false, current_timestamp, 0, '${id}', 0); `;

  await pool.query(query, [req.body.teamName]);
  res.send({ teamCode: id });

  const matchQuery = `UPDATE matches
    SET number_of_teams = number_of_teams + 1
    WHERE id = 2`;

  pool.query(matchQuery);
};
