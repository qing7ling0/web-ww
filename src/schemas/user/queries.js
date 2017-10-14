import {
  GraphQLList
} from 'graphql';

import * as types from './types';
import { userModel } from '../../models'


export const list = {
	type: new GraphQLList(types.user),
	async resolve (root, params, options) {
  		var users = await userModel.find({});
  		return users;
	}
}