const useGenre = (selectedGenres) => {
  if (selectedGenres.length < 1) return "";

  const GenreIds = selectedGenres.map((g) => g.id);
  return GenreIds.reduce((accumulator, currentValue) => accumulator + "," + currentValue );
}

export default useGenre;

// acumulator main value || first value 