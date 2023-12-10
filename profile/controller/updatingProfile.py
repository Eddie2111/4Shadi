from datatypes.UserModel import UpdateProfileModel
from schema.ProfileSchema import Profile

async def updatingProfile(data: UpdateProfileModel):
    try:

        # Check if data is not None
        if data:
            # Check if the serial of the data exist in database
            datalog = await Profile.find_one(Profile.serial == str(data.serial))

            # Update with new data if datalog exists
            if datalog:

                # data is posted and datalog is pulled from the database
                datalog.name = data.name or datalog.name
                datalog.email = data.email or datalog.email
                datalog.nid_number = data.nid_number or datalog.nid_number
                datalog.birth_cert = data.birth_cert or datalog.birth_cert
                datalog.marriage_cert = data.marriage_cert or datalog.marriage_cert
                datalog.age = data.age or datalog.age
                datalog.phone_number = data.phone_number or datalog.phone_number
                datalog.height = data.height or datalog.height
                datalog.location = data.location or datalog.location
                datalog.preferences = data.preferences or datalog.preferences
                datalog.gender = data.gender or datalog.gender
                datalog.lookingFor = data.lookingFor or datalog.lookingFor
                datalog.profileImage = data.profileImage or datalog.profileImage

                # Check if images is not None
                if data.images:
                    # Check if images is not empty
                    if len(datalog.images) == 0:
                        datalog.images = data.images

                # save to database
                await datalog.replace()

                return {
                    "message": "updated successfully from controller",
                    "status": 200
                }

        return {
            "message": "previous data not found",
            "status": 302
        }

    except Exception as e:
        print(e)
        return {
            "message": "query execution failure",
            "status": 500
        }