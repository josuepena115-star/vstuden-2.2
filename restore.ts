import * as fs from 'fs';

let appCode = fs.readFileSync('src/App.tsx', 'utf8');

// I will just download the original App.tsx or undo my regexes.
// The broken regex string was:
// appCode.replace(/                      <\/button>\n                    <\/div>\n                  <\/Card>\n                \)/g, ...
// and similarly for the div block.

// Let's revert ALL `                    )} \n                  </Card>\n                )`
appCode = appCode.replace(/                    \)} \n                  <\/Card>\n                \)/g,
`                  </Card>\n                )`);

appCode = appCode.replace(/                    \)} \n                  <\/Card>\n                \)}\n              <\/div>/g,
`                  </Card>\n                )}\n              </div>`);

// Revert the drug one
appCode = appCode.replace(/                    \)} \n                  <\/Card>\n                \);/g,
`                  </Card>\n                );`);

fs.writeFileSync('src/App.tsx', appCode);
