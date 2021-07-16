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
        'password_confirmation',

        'vk',
        'website',
        'facebook',
        'instagram',
        'youtube'
      ],
      keyForAttribute: user.password_confirmation ? "snake_case" : "camelCase"
    });

    return UserSerializer.serialize(user);
  }

  static serializeProduct = (product: any) => {
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

    return ProductSerializer.serialize(product);
  }

  static serializeDivorce = (divorce: any) => {
    const DivorceSerializer = new Serializer('divorces', {
      attributes: [
        'title',
        'description',
        'cb',

        'tmpMorphs',

        'sexPhotos',
        'masonryPhotos',
        'exitPhotos',

        'tmpImages',

        'kind',
        'subcategory',
      ],

      typeForAttribute: function (attribute, data) {
        // sometimes this returns undefined
        return data.customType;
      },

      // @ts-ignore
      sexPhotos: {
        type: 'images',
        ref: 'id',
        attributes: []
      },

      // @ts-ignore
      masonryPhotos: {
        type: 'images',
        ref: 'id',
        attributes: []
      },

      // @ts-ignore
      exitPhotos: {
        type: 'images',
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


      keyForAttribute: "camelCase"
    });

    return DivorceSerializer.serialize(divorce);
  }
}
