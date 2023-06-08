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

//Create an empty array to store survivable instances in
let surviveableInstances = [];

//Factory function that returns and object that contains the properties specimenNum and dna
let pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,
    mutate() {
      //Select a new base index and DNA base to mutate into original dna
      let newBase = returnRandBase();
      const newBaseIndex = Math.floor(Math.random() * 15);
      //Let the user know what has been selected
      console.log(
        `\nMutation base index: ${newBaseIndex}. Mutation base: ${newBase}.\n`
      );
      //In the event that the new index and DNA base happen to match the original DNA, try again until they do not match
      while (dna[newBaseIndex] === newBase) {
        console.log(
          `\nBases at index ${newBaseIndex} match, reconfiguring...\n`
        );
        newBase = returnRandBase();
        console.log(
          `\nNew base returned at index ${newBaseIndex}: ${newBase}.\n`
        );
      }
      //Once they no longer match, update the index for the DNA mutation
      if (newBase !== dna[newBaseIndex]) {
        dna[newBaseIndex] = newBase;
      }
      dna[newBaseIndex] = newBase;
    },
    compareDNA(pAequorObj) {
      //Compares current DNA with passed in pAequor DNA, computes how many bases are identical and in the same index (as a percentage)

      //Start by console logging the two objects' specimen numbers and DNA strands
      console.log(`\nComparing DNA strands:`);
      console.log(`\nSpecimen: ${this.specimenNum}. Bases: ${this.dna}`);
      console.log(
        `\nSpecimen: ${pAequorObj.specimenNum}. Bases ${pAequorObj.dna}`
      );

      //Compute the percentage of identical indexes and bases
      let counter = 0;
      for (i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === pAequorObj.dna[i]) {
          counter++;
        }
      }
      const percentageInCommon = Math.floor((counter / 15) * 100);
      console.log(
        "\nThe specimens have " + percentageInCommon + "% DNA in common."
      );
    },
    willLikelySurvive() {
      //Calculates the percentage of total C & G bases in the DNA strand combined and returns true if they make up at least 60% of the DNA strand
      let CGCounter = 0;
      for (i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === "C" || this.dna[i] === "G") {
          CGCounter++;
        }
      }
      console.log(
        `\nPercentage of C or G in DNA strand: ${Math.floor(
          (CGCounter / 15) * 100
        )}%`
      );
      return Math.floor((CGCounter / 15) * 100) >= 60;
    },
  };
};

//Function to create 30 instances of objects as long as Obj.willLikelySurvive() returns true
const createInstances = () => {
  while (surviveableInstances.length < 30) {
    for (i = 0; i < 30; i++) {
      let instance = pAequorFactory(i, mockUpStrand());

      if (instance.willLikelySurvive) {
        surviveableInstances.push(instance);
      }
    }
  }
};

const myFactory = pAequorFactory(1, mockUpStrand());

createInstances();
console.log(surviveableInstances);
