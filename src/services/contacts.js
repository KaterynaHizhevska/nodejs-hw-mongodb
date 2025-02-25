import { SORT_ORDER } from "../constants/constants.js";
import { ContactCollection } from "../db/models/contact.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllContacts = async ({
    userId,
    page,
    perPage,
    sortOrder = SORT_ORDER.ASC,
    sortBy = '_id',
    filter = {},
}) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = ContactCollection.find({ userId });

    if (filter.type) {
        contactsQuery.where('contactType').equals(filter.type);
    }

    if (typeof filter.isFavourite === 'boolean') {
        contactsQuery.where('isFavourite').equals(filter.isFavourite);
    }

    const [contactsCount, contacts] = await Promise.all([
        ContactCollection.find({ userId }).merge(contactsQuery).countDocuments(),
        contactsQuery
            .skip(skip)
            .limit(limit)
            .sort({ [sortBy]: sortOrder })
            .exec(),
    ]);

    const paginationData = calculatePaginationData(contactsCount, perPage, page);
    return {
        data: contacts,
        ...paginationData,
    };
};

export const getContactById = async (contactId, userId) => {
    const contact = await ContactCollection.findOne({ _id: contactId, userId });
    return contact;
};

export const deleteContact = async (contactId, userId) => {
    const contact = await ContactCollection.findOneAndDelete({ _id: contactId, userId });
    return contact;
};

export const createContact = async (payload) => {
    const contact = await ContactCollection.create(payload);
    return contact;
};

export const patchContact = async (contactId, userId, payload, options = {}) => {
    const rawResult = await ContactCollection.findOneAndUpdate(
        { _id: contactId, userId },
        payload,
        {
            new: true,
            includeResultMetadata: true,
            ...options,
        },
    );

    if (!rawResult || !rawResult.value) return null;
    return {
        contact: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
};



// export const getAllContacts = async ({
//     page,
//     perPage,
//     sortOrder = SORT_ORDER.ASC,
//     sortBy = '_id',
//     filter = {},
// }) => {
//     const limit = perPage;
//     const skip = (page - 1) * perPage;

//     const contactsQuery = ContactCollection.find();

//     if (filter.type) {
//         contactsQuery.where('contactType').equals(filter.type);
//     }

//     if (typeof filter.isFavourite === 'boolean') {
//     contactsQuery.where('isFavourite').equals(filter.isFavourite);
// }
//     const [contactsCount, contacts] = await Promise.all([
//     ContactCollection.find().merge(contactsQuery).countDocuments(),
//     contactsQuery
//       .skip(skip)
//       .limit(limit)
//       .sort({ [sortBy]: sortOrder })
//       .exec(),
//     ]);

//     const paginationData = calculatePaginationData(contactsCount, perPage, page);
//   return {
//     data: contacts,
//     ...paginationData,
//   };
// };

// export const getContactById = async (contactId) => {
//   const contact = await ContactCollection.findById(contactId);
//   return contact;
// };

// export const deleteContact = async (contactId) => {
//   const contact = await ContactCollection.findOneAndDelete({
//     _id: contactId,
//   });
//   return contact;
// };

// export const createContact = async (payload) => {
//   const contacts = await ContactCollection.create(payload);
//   return contacts;
// };



// export const patchContact = async (contactId, payload, options = {}) => {
//     const rawResult = await ContactCollection.findOneAndUpdate(
//         {
//             _id: contactId,
//         },
//         payload,
//         {
//             new: true,
//             includeResultMetadata: true,
//             ...options,
//         },
//     );

//     if (!rawResult || !rawResult.value) return null;
//     return {
//     contact: rawResult.value,
//     isNew: Boolean(rawResult?.lastErrorObject?.upserted),
//   };
// };
