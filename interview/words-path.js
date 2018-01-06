// LEAD -> GOLD
// LEAD -> LOAD -> GOAD -> GOLD
// one letter change at a time
// all transitions must be in dictionary

function findPath(fromWord, toWord, dictionary) {
    let pathsSoFar = [];
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const visited = {};

    const exploreNextWords = function (path) {
        let word = path[path.length - 1];
        let successfulPath = null;
        word = word.split('');

        word.forEach(function (chr, i) {
            alphabet.forEach(function(replacement) {
                if (chr === replacement) {
                    return;
                }
                let nextWord = word.slice(0, i);
                nextWord.push(replacement);
                nextWord = nextWord.concat(word.slice(i + 1)).join('');

                if (!dictionary[nextWord] || visited[nextWord]) {
                    return;
                }
                visited[nextWord] = true;

                if (nextWord === toWord) {
                    successfulPath = path.concat([nextWord]);
                    return;
                }

                pathsSoFar.push(path.concat([nextWord]));
            });
        });

        if (successfulPath) {
            return successfulPath;
        } else if (pathsSoFar.length === 0) {
            return null;
        } else {
            const nextPath = pathsSoFar[0]
            pathsSoFar = pathsSoFar.slice(1);
            return exploreNextWords(nextPath);
        }
    }

    return exploreNextWords([fromWord]);
}

console.log(findPath('LEAD', 'GOLD', {
  'LEAD': true,
  'LOAD': true,
  'GOAD': true,
  'GOLD': true,
}));
