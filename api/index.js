const vietnamProvincesAPI = {
    main: 'https://provinces.open-api.vn/api/',
    show_all_divisions: (code) => `https://provinces.open-api.vn/api/?depth=${code}`,
    provinces: 'https://provinces.open-api.vn/api/p/',
    search_provinces: (name) => `https://provinces.open-api.vn/api/p/search/?q=${name}`,
    get_provinces: (p, code) => `https://provinces.open-api.vn/api/p/${p}?depth=${code}`,
    get_districts: (p, code) => `https://provinces.open-api.vn/api/d/${p}?depth=${code}`,
};

export { vietnamProvincesAPI };
