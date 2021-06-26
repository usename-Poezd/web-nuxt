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

  static serializeProduct = (user: any) => {
    const ProductSerializer = new Serializer('products', {
      attributes: [
        'name',
        'price',
        'currency',
        'age',
        'sex',
        'cb',
        'description',
        'article',
        'group',
        'groupMale',
        'groupFemale',
        'tmpImages',
        'tmpMorphs',
        'tmpPreview',
        'isActive',
        'askPrice',
        'images',
        'preview',

        'kind',
        'subcategory',
        'locality'
      ],

      typeForAttribute: function (attribute, data) {
        // sometimes this returns undefined
        return data.customType;
      },

      // @ts-ignore
      age: {
        ref: 'id',
        attributes: []
      },

      // @ts-ignore
      preview: {
        type: 'images',
        ref: 'id',
        attributes: []
      },

      // @ts-ignore
      images: {
        ref: 'id',
        attributes: []
      },

      // @ts-ignore
      kind: {
        ref: 'id',
        attributes: []
      },

      // @ts-ignore
      subcategory: {
        ref: 'id',
        attributes: []
      },

      // @ts-ignore
      locality: {
        ref: 'id',
        attributes: []
      },


      keyForAttribute: "camelCase"
    });

    return ProductSerializer.serialize(user);
  }
}
