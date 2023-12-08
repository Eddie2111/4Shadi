# Govt_mock server

Description: Will take inputs as IDataProps

Task:

- create a simple api with the endpoints mentioned here
- create a mock data using python or other programming lang
- connect mysql with the project
- Store the mock generated data and fetch the data using "Like" query or other way.

## Endpoints

- /post: user posts data as IDataProps
- /get : user provides id as request parameter [req.params] example: localhost:4100/get?[id]

## IDataProps {

    serial: string
    birth_certificate: string
    nid_number: string
    marriage_certificate: string
}
