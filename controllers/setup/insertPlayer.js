module.exports = async (req, res) => {
  const userQuery = `INSERT INTO users(
    first_name, last_name, email_address, password, created_at, updated_at)
    VALUES ('$1', '$2', '$3', NULL, current_timestamp, current_timestamp);
  
    SELECT id
    FROM users
    WHERE email_address = '$3';
    
    SELECT id
    FROM teams
    WHERE invitation_key = '$4';`;
  const playerResult = await pool.query(userQuery, [req.body.firstname, req.body.lastname, req.body.email, req.body.teamcode]);
  const userid = result[1].rows[0].id;
  const teamid = result[2].rows[0].id;

  const participantsQuery = `INSERT INTO participants(
      user_id, team_id, distance, date_start, date_end, created_at, updated_at, is_started, is_finished)
        VALUES($1, $2, $3, NULL, NULL, current_timestamp, current_timestamp, false, false);`;
  await pool.query(participantsQuery, [userid, teamid, req.body.distance]);
  res.send("Klaar");
};
