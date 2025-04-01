class Professeur {
    constructor(nom, prenom, genre, laris, age, specialite, univ_etudes, annee_phd, statut, sujet_these, photo, isCorrect = false) {
      this.nom = nom;
      this.prenom = prenom;
      this.genre = genre;
      this.laris = laris;
      this.age = age;
      this.specialite = specialite;
      this.univ_etudes = univ_etudes;
      this.annee_phd = annee_phd;
      this.statut = statut;
      this.sujet_these = sujet_these;
      this.photo = photo;
      this.isCorrect = isCorrect;
    }
  }
  
  export default Professeur;
  