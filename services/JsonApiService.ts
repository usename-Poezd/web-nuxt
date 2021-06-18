import {Serializer} from "jsonapi-serializer";

export class JsonApiService {
  static serializeUser = (user: any) => {
    const UserSerializer = new Serializer('users', {
      attributes: [
        'name',
        'surname',
        'isBreeder',
        'companyName',
        'description',
        'logoImg',
        'profileImg',
        'policity',
        'localDelivery',
        'regionalDelivery',
        'countrywideDelivery',
        'location',
        'password',
        'password_confirmation'
      ],
      keyForAttribute: "snake_case"
    });

    return UserSerializer.serialize(user);
  }
}
