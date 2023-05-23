import mongoose, { Schema, Document } from 'mongoose';

interface ICharacteristic {
  description: string;
}

interface IProduct extends Document {
  name: string;
  price: number;
  image: string | null;
  payment: string;
  description: string;
  characteristics: ICharacteristic[];
  createdAt: Date;
  updatedAt: Date;
}

const productSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
    payment: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    characteristics: [
      {
        description: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;
