// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Factory function that returns an object that contains the properties specimenNum and dna
function pAequorFactory(specimenNum, dna){
  return {
    specimenNum: specimenNum,
    dna: dna,
    mutate() {
      const newBaseIndex = Math.floor(Math.random() * dna.length);
      let random = returnRandBase();
      console.log(
        `Specimen ${this.specimenNum} position ${newBaseIndex + 1} DNA base ${
          this.dna[newBaseIndex]
        }`
      );
      while (this.dna[newBaseIndex] === random) {
        random = returnRandBase();
      }
      this.dna[newBaseIndex] = random;
      console.log(`${this.dna[newBaseIndex]}`);
    },
    compareDNA(pAequorObj) {
      let counter = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === pAequorObj.dna[i]) {
          counter++;
        }
      }
      const percentageInCommon = (counter / 15) * 100;
      console.log(
        "\nThe specimens have " + percentageInCommon + "% DNA in common."
      );
    },
    willLikelySurvive() {
      let CGCounter = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === "C" || this.dna[i] === "G") {
          CGCounter++;
        }
      }

      const survivalPercentage = CGCounter / this.dna.length;
      const willSurvive = survivalPercentage >= 0.6;

      if (willSurvive) {
        console.log(`specimen # ${this.specimenNum} will likely survive!`);
      } else {
        console.log(`specimen # ${this.specimenNum} will not survive!`);
      }

      return willSurvive;
    }
  };
};

const pAequorArray = [];
for (let i = 1; i <= 30; i++) {
  const pAequor = pAequorFactory(i, mockUpStrand());
  if (pAequor.willLikelySurvive()) {
    pAequorArray.push(pAequor);
  }
}
console.log(JSON.stringify(pAequorArray, null, 2));
