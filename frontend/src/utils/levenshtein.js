 //https://stackoverflow.com/questions/22308014/damerau-levenshtein-distance-implementation
 
 
 function levenshtein (seq1,seq2){  
    //  console.log("levenshtein got "+seq1 +" "+seq2)
     
    return new Promise(function(resolve, reject){
     var len1=seq1.length;
     var len2=seq2.length;
     var i, j;
     var dist;
     var ic, dc, rc;
     var last, old, column;
 
     var weighter={
         insert:function(c) { return 1.; },
         delete:function(c) { return 0.5; },
         replace:function(c, d) { return 0.3; }
     };
 
     /* don't swap the sequences, or this is gonna be painful */
     if (len1 === 0 || len2 === 0) {
         dist = 0;
         while (len1)
             dist += weighter.delete(seq1[--len1]);
         while (len2)
             dist += weighter.insert(seq2[--len2]);
         return dist;
     }
 
     column = []; // malloc((len2 + 1) * sizeof(double));
     //if (!column) return -1;
 
     column[0] = 0;
     for (j = 1; j <= len2; ++j)
         column[j] = column[j - 1] + weighter.insert(seq2[j - 1]);
 
     for (i = 1; i <= len1; ++i) {
         last = column[0]; /* m[i-1][0] */
         column[0] += weighter.delete(seq1[i - 1]); /* m[i][0] */
         for (j = 1; j <= len2; ++j) {
             old = column[j];
             if (seq1[i - 1] === seq2[j - 1]) {
                 column[j] = last; /* m[i-1][j-1] */
             } else {
                 ic = column[j - 1] + weighter.insert(seq2[j - 1]);      /* m[i][j-1] */
                 dc = column[j] + weighter.delete(seq1[i - 1]);          /* m[i-1][j] */
                 rc = last + weighter.replace(seq1[i - 1], seq2[j - 1]); /* m[i-1][j-1] */
                 column[j] = ic < dc ? ic : (dc < rc ? dc : rc);
             }
             last = old;
         }
     }
 
     dist = column[len2];
    //  console.log('calculated lev distance ' + dist)
     resolve(dist);
 })}
 
export default levenshtein