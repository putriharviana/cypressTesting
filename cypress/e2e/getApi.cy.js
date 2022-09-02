describe("Get and Post Api", ()=> {
    it("Get Api List User", ()=> {
        cy.request('https://reqres.in/api/users?page=2').then((response) => {
            expect(response.status).to.eq(200)
            const listUser = response.body.data

            if (listUser != null){
                console.log("true")
            }
        })
    })

    it("Post Api Create User", ()=> {
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/users', // baseUrl is prepend to URL
            form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
            body: {
                "name": "morpheus",
                "job": "leader",
            },
        }).then((response)=>{
            // console.log(response)
            expect(response.status).to.eq(201)
            expect(response.body).has.property("name", "morpheus")
            expect(response.body).has.property("job", "leader")

            const id = response.body.id
            console.log(id)



            cy.request({
                method: 'PUT',
                url: 'https://reqres.in/api/users/' + id, // baseUrl is prepend to URL
                form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
                body: {
                    "name": "morpheus",
                    "job": "zion resident",
                },
            }).then((response)=>{
                console.log(response)
                expect(response.status).to.eq(200)
                expect(response.body).has.property("name", "morpheus")
                expect(response.body).has.property("job", "zion resident")
            })



            cy.request({
                method: 'DELETE',
                url: 'https://reqres.in/api/users/' + id, // baseUrl is prepend to URL
            }).then((response)=>{
                console.log(response)
                expect(response.status).to.eq(204)
            })
        })

    })
})