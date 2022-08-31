describe("Testing", ()=> {
    it("Checking data should not equal", ()=> {
        cy.request('https://reqres.in/api/unknown').then((response) => {
            expect(response.status).to.eq(200)
            const firstData = response.body.data

            cy.request('https://jsonplaceholder.typicode.com/users').then((response) => {
                expect(response.status).to.eq(200)
                const secondData = response.body
                
                const resultSecondData = secondData.map( resultData => ({
                    secondId: resultData.id,
                    secondAmount: resultData.address.geo.lng
                }));

                const resultFirstData = firstData.map( resultData => ({
                    firstId: resultData.id,
                    firstAmount: resultData.year
                }));
                const resultFirstDataCloning = firstData.map( resultData => ({
                    firstIdCloning: resultData.id,
                    firstAmountCloning: resultData.year
                }));
                
                resultFirstData.forEach(({firstId, firstAmount})=> {
                    resultSecondData.forEach(({secondId, secondAmount})=> {
                       if((firstId == secondId) && (firstAmount == secondAmount)){
                            console.log("true")
                        }else if((firstId == secondId) && (firstAmount != secondAmount)){
                            console.log("false")
                        }
                    })
                })
            })
        })
    })
})