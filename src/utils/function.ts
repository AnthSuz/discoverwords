export const getRoles = (
  role: string | "courteous" | "impostor" | "cheater"
) => {
  if (role === "courteous") {
    return "Courtois";
  } else if (role === "cheater") {
    return "Tricheur";
  } else if (role === "impostor") {
    return "Imposteur";
  }
};
