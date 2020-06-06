function submit() {
  let value = document.getElementById("team-input").value;

  axios
    .post("/insert_team", {
      teamName: value,
    })
    .then(function (res) {
      document.getElementById("teamcode").innerText = res.data.teamCode;
    });
}

function submitplayer() {
  let firstname = document.getElementById("player-input-firstname").value;
  let lastname = document.getElementById("player-input-lastname").value;
  let email = document.getElementById("player-input-email").value;
  let teamcode = document.getElementById("player-input-teamcode").value;
  let distance = document.getElementById("player-input-distance").value;
  let position = document.getElementById("player-input-position").value;

  axios.post("/insert_player", {
    firstname,
    lastname,
    email,
    teamcode,
    distance,
    position,
  });
}
