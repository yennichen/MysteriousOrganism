// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (num, arr) => {
  return {
    specimenNum: num, 
    dna: arr,
    mutate() {
        // Select a random index in the DNA array
        const randomIndex = Math.floor(Math.random() * this.dna.length);
        // Get the current base at the random index
        let currentBase = this.dna[randomIndex];
        // Get a new base different from the current one
        let newBase = returnRandBase();
        while (newBase === currentBase) {
           newBase = returnRandBase();
        }
        this.dna[randomIndex] = newBase;
        return this.dna;
    },
    compareDNA(dna) {
      //to count how many of the dna is identical
      let count = 0; 
      for (let i=0; i < this.dna.length; i++) {
        if (this.dna[i] === dna[i]) {
          count++;
        }
      }
      const percentage = (count/this.dna.length) *100;
      console.log(`Specimen ${this.specimenNum} and specimen ${dna.specimenNum} have ${percentage.toFixed(2)}% DNA in common.`);
    },
    willLikelySurvive(dna) {
      let countCG = 0;

      for (let i=0; i < this.dna.length; i++) {
               
        if (this.dna[i] == 'C' || this.dna[i] == 'G' ) {
          countCG++;
        } 
      }
      const percentageCG = countCG/this.dna.length;

      return percentageCG > 0.6 ? true : false;
    }
  
}}

// Create 30 instances of pAequor
const instances = [];
let specimenNum = 1;
while (specimenNum <=30) {
  const newOrganism = pAequorFactory(specimenNum, mockUpStrand());
  if (newOrganism.willLikelySurvive()) {
    instances.push(newOrganism);
  }
  specimenNum++;
}

// Output the array of survivable instances for further study
console.log(instances);


