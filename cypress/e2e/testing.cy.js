describe("Testing", ()=> {
    it("Upload some photos(1)", ()=> {
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

                resultFirstData.forEach(({firstId, firstAmount})=> {
                    resultSecondData.forEach(({secondId, secondAmount})=> {
                        if((firstId == secondId) && (firstAmount == secondAmount)){
                            console.log("return true")
                        }else{
                            console.log("return false")
                        }
                    })
                })
            })
        })
    })
})