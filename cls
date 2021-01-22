[33mcommit bc1ed0fddd0563d13b51ea956e66d8628679765b[m[33m ([m[1;36mHEAD -> [m[1;32mmaster[m[33m, [m[1;31morigin/master[m[33m, [m[1;31morigin/HEAD[m[33m)[m
Author: sumit9818 <sumit@idreambiz.com>
Date:   Mon Jul 29 18:45:00 2019 +0530

    dashboard and account summary ui

 node_modules/.bin/node-sass                        |  16 [32m+[m[31m-[m
 .../node-sass/vendor/win32-x64-64/binding.node     | Bin [31m0[m -> [32m2405376[m bytes
 .../customer-dashboard.component.html              | 153 [32m++[m[31m--[m
 .../customer-dashboard.component.scss              | 189 [32m+[m[31m----[m
 src/app/loan-detail/loan-detail.component.html     | 450 [32m+++++[m[31m-----[m
 src/app/loan-detail/loan-detail.component.scss     | 592 [32m++++++[m[31m-------[m
 src/app/loan-detail/loan-detail.component.ts       |   5 [32m+[m[31m-[m
 src/assets/Dmifinance-logo.png                     | Bin [31m7048[m -> [32m0[m bytes
 src/assets/edit.jpg                                | Bin [31m0[m -> [32m1711[m bytes
 src/assets/logo.png                                | Bin [31m5064[m -> [32m3999[m bytes
 src/assets/logo2.png                               | Bin [31m0[m -> [32m5064[m bytes
 src/assets/logout.png                              | Bin [31m0[m -> [32m2134[m bytes
 src/index.html                                     |  37 [32m+[m[31m-[m
 src/styles.scss                                    | 917 [32m+++++++++++++[m[31m--------[m
 14 files changed, 1160 insertions(+), 1199 deletions(-)

[33mcommit c01e703f6185a4ee19402f9622af687457949db0[m
Author: ravi_idb <ravi.idb@idreambiz.com>
Date:   Fri Jul 26 17:52:08 2019 +0530

    this the test

 .../customer-dashboard.component.html              |   2 [32m+[m[31m-[m
 .../customer-dashboard.component.scss              | 105 [32m+++++++++++[m[31m----------[m
 src/app/loan-detail/loan-detail.component.html     |  21 [32m++++[m[31m-[m
 src/app/loan-detail/loan-detail.component.scss     |   2 [32m+[m[31m-[m
 src/app/loan-detail/loan-detail.component.ts       |  28 [32m+++++[m[31m-[m
 5 files changed, 101 insertions(+), 57 deletions(-)

[33mcommit 69b0b75a44e375f838cc1afac068cfcff4e7096e[m
Author: ravi_idb <ravi.idb@idreambiz.com>
Date:   Thu Jul 25 20:10:09 2019 +0530

    all up-to-date

 README.md                                          |     27 [32m+[m
 angular.json                                       |    140 [32m+[m
 dist/dmi-live.zip                                  |    Bin [31m0[m -> [32m1403122[m bytes
 dist/dmi-live/3rdpartylicenses.txt                 |    354 [32m+[m
 dist/dmi-live/assets/Dmi_video.jpg                 |    Bin [31m0[m -> [32m306374[m bytes
 dist/dmi-live/assets/Dmifinance-logo.png           |    Bin [31m0[m -> [32m7048[m bytes
 dist/dmi-live/assets/arogya-finance.png            |    Bin [31m0[m -> [32m6692[m bytes
 dist/dmi-live/assets/auction.svg                   |     24 [32m+[m
 dist/dmi-live/assets/call-answer.svg               |      9 [32m+[m
 dist/dmi-live/assets/dashboard.svg                 |     24 [32m+[m
 dist/dmi-live/assets/dmi-finance.png               |    Bin [31m0[m -> [32m5138[m bytes
 dist/dmi-live/assets/dots.svg                      |      7 [32m+[m
 dist/dmi-live/assets/facebook.svg                  |      5 [32m+[m
 dist/dmi-live/assets/faq.svg                       |     44 [32m+[m
 dist/dmi-live/assets/indialends.png                |    Bin [31m0[m -> [32m6692[m bytes
 dist/dmi-live/assets/js/bootstrap.min.js           |      7 [32m+[m
 dist/dmi-live/assets/js/jquery.1.12.4.min.js       |      5 [32m+[m
 dist/dmi-live/assets/js/main.js                    |     27 [32m+[m
 dist/dmi-live/assets/js/overlayScrollbars.min.js   |     13 [32m+[m
 dist/dmi-live/assets/js/owl.carousel.min.js        |      7 [32m+[m
 dist/dmi-live/assets/js/validator.min.js           |      4 [32m+[m
 dist/dmi-live/assets/letsmd.png                    |    Bin [31m0[m -> [32m5333[m bytes
 dist/dmi-live/assets/linkedin-letters.svg          |      9 [32m+[m
 dist/dmi-live/assets/loading.gif                   |    Bin [31m0[m -> [32m147413[m bytes
 dist/dmi-live/assets/loan_account.png              |    Bin [31m0[m -> [32m27833[m bytes
 dist/dmi-live/assets/loan_image.jpg                |    Bin [31m0[m -> [32m17349[m bytes
 dist/dmi-live/assets/lock.svg                      |      7 [32m+[m
 dist/dmi-live/assets/login-bg.png                  |    Bin [31m0[m -> [32m152683[m bytes
 dist/dmi-live/assets/logo.png                      |    Bin [31m0[m -> [32m5064[m bytes
 dist/dmi-live/assets/logo.svg                      |     21 [32m+[m
 dist/dmi-live/assets/logo_cp.png                   |    Bin [31m0[m -> [32m12351[m bytes
 dist/dmi-live/assets/logout.svg                    |      6 [32m+[m
 dist/dmi-live/assets/mobikwik.png                  |    Bin [31m0[m -> [32m54570[m bytes
 dist/dmi-live/assets/money-bag.svg                 |     23 [32m+[m
 dist/dmi-live/assets/offer_image.svg               |      8 [32m+[m
 dist/dmi-live/assets/play.svg                      |     21 [32m+[m
 dist/dmi-live/assets/samsung.png                   |    Bin [31m0[m -> [32m3613[m bytes
 .../buttons.scssc                                  |    Bin [31m0[m -> [32m10993[m bytes
 .../footer.scssc                                   |    Bin [31m0[m -> [32m475[m bytes
 .../grid.scssc                                     |    Bin [31m0[m -> [32m10065[m bytes
 .../navbar.scssc                                   |    Bin [31m0[m -> [32m475[m bytes
 .../responsive.scssc                               |    Bin [31m0[m -> [32m479[m bytes
 .../variable.scssc                                 |    Bin [31m0[m -> [32m2361[m bytes
 .../main.scssc                                     |    Bin [31m0[m -> [32m3852[m bytes
 .../_functions.scssc                               |    Bin [31m0[m -> [32m25158[m bytes
 .../_mixins.scssc                                  |    Bin [31m0[m -> [32m4863[m bytes
 .../_variables.scssc                               |    Bin [31m0[m -> [32m213845[m bytes
 .../bootstrap.scssc               