import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    acl_dashboard_read: {
                        table: 'sys_security_acl'
                        id: '9945fed00cc84f1fbefc4798d30cce7e'
                    }
                    app_menu: {
                        table: 'sys_app_application'
                        id: '6a691836d599465f8f1f6c6bee9f0a74'
                    }
                    bom_json: {
                        table: 'sys_module'
                        id: 'be675b754a1c48b5abb71100864ee864'
                    }
                    mod_aurora: {
                        table: 'sys_app_module'
                        id: '6a59f5d35abf4dbba6141c0126b55c87'
                    }
                    mod_balanco: {
                        table: 'sys_app_module'
                        id: 'a5c32ec72671498296982a56e26e608c'
                    }
                    mod_customers: {
                        table: 'sys_app_module'
                        id: '186c343c1db14f5b86be866da0577efa'
                    }
                    mod_monthly: {
                        table: 'sys_app_module'
                        id: 'a867b8614d494fe4a3ad27f38171cfe3'
                    }
                    mod_nexus: {
                        table: 'sys_app_module'
                        id: 'b0bd5d78bbd04514a198750bb53e3bd3'
                    }
                    mod_orders: {
                        table: 'sys_app_module'
                        id: '73f1702e139c4833a72c47319717a764'
                    }
                    mod_portal: {
                        table: 'sys_app_module'
                        id: '6af6a3dad83f41c08557e1d9871dc8a3'
                    }
                    mod_products: {
                        table: 'sys_app_module'
                        id: '54c73ee5961b406aac06806f035a09d6'
                    }
                    mod_sep_dash: {
                        table: 'sys_app_module'
                        id: '39b9e38e43d0441a8b722c4e2b72d62a'
                    }
                    mod_sep_data: {
                        table: 'sys_app_module'
                        id: '64ae0b41c296412e81ca334e0709dfda'
                    }
                    'nexus/styles.css': {
                        table: 'sys_ux_theme_asset'
                        id: '3ac9f2bc55004c119402c0e0fc910277'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: 'aa96b32ca6134a0da1504e7c7ddd26af'
                    }
                    rest_dashboard: {
                        table: 'sys_ws_definition'
                        id: 'f82c1e3eab984ac086344f69247d1d4c'
                    }
                    rest_dashboard_data: {
                        table: 'sys_ws_operation'
                        id: '7dfe3030068b461db9b4eb679a044eb6'
                    }
                    src_server_aggregations_customers_ts: {
                        table: 'sys_module'
                        id: '3078b0e10dc74e6e84a230f0e9010faf'
                    }
                    src_server_aggregations_kpis_ts: {
                        table: 'sys_module'
                        id: 'fc775350b0d349a9a9ea8a6b12292ee5'
                    }
                    src_server_aggregations_monthly_ts: {
                        table: 'sys_module'
                        id: '7d897ccfd3ce4ac69a732c88e0a41a79'
                    }
                    src_server_aggregations_products_ts: {
                        table: 'sys_module'
                        id: '7292c4b9b26b4bce818ad6f44c1998f7'
                    }
                    src_server_aggregations_sales_ts: {
                        table: 'sys_module'
                        id: '0e3517daae1741d9b24705996cde4480'
                    }
                    src_server_aggregations_util_ts: {
                        table: 'sys_module'
                        id: 'e7a5e689ca9e4b3bb84f62ad5b7312d2'
                    }
                    'src_server_dashboard-handler_ts': {
                        table: 'sys_module'
                        id: '0935089acbce4574a590fae0c66a043a'
                    }
                    src_server_script_ts: {
                        table: 'sys_module'
                        id: '5ee2092b44904bed9a256cf7a612c8b2'
                    }
                }
                composite: [
                    {
                        table: 'sys_documentation'
                        id: '009e2b92d347439696f1f70d85d4d579'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'month'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '00bbd9a9c9d248f09a8aff28287688df'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'order_status'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '00c4c6caafdc46e683c02f7ee5d045f3'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'preferred_device'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '019ca9da673a4a95a436e33e7f19c46b'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'order_status'
                            value: 'Returned'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '02162df454394e1490c055d04c7799b6'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'is_repeat_customer'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '022a1be4ea00447e815745c85a2beaf4'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'reviews_given'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '02fc4a6c32b9433292ed073a490c1abd'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'returned'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '04a61bceedf74ea1b9ce21f4624edb76'
                        key: {
                            name: 'x_snc_dashboard_se_monthly_revenue'
                            element: 'avg_discount_pct'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '06850f8eeb294efaaf1a4e523b309033'
                        key: {
                            name: 'x_snc_dashboard_se_product_summary'
                            element: 'total_revenue_usd'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '07a8885b5e7044088c2fe6794c73c595'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'returns_made'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '09f670e3e9094db9ae3d70cf67949ab4'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'preferred_device'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0a313a6644b643aebd0ece2e4f3247dd'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'order_status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0bc424fbd65347bb8218bccfb0dbec3c'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'session_duration_minutes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0c4a4da8bca3491283134646af4e3db9'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'customer_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0ce09c7a77a8443f9722da0f7fcb558b'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'age'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0d9cb5b7501d439fb80ddf1b92f462e8'
                        key: {
                            name: 'x_snc_dashboard_se_monthly_revenue'
                            element: 'quarter'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0fbdfa52f4b14467b0a3e93b8debe8cb'
                        key: {
                            name: 'x_snc_dashboard_se_product_summary'
                            element: 'return_rate'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '109a002a2b624142ae9a22b7552a0b68'
                        key: {
                            application_file: 'e77b7f1557b84ef5a8fd700e794ac731'
                            source_artifact: '9bddb935f43d401781decffd8b0ee472'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '10f0facc252a424ab3f50ed9a4540d45'
                        key: {
                            application_file: '54f802c37abb458a8e5fc3f16805f290'
                            source_artifact: '7b7fcfbd0dfc4fbd941b4b6bc159cc89'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '10f268b808774ed4802cd892c8d875e0'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'discount_pct'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '111d6b5fcf25424a84d0d9de407f69ae'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'customer_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1860a8747de84ab79eea06e688119e65'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'order_date'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1a7daea640fc41a381c62e3fc9cdd8b0'
                        key: {
                            name: 'x_snc_dashboard_se_monthly_revenue'
                            element: 'quarter'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1cb06375276541279c06c80001361f98'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'total_orders'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1f2e289e80ca4d6bab7aed205f0a65ea'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'day_of_week'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1f7d801c659c438088085bac9cc0bc33'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'total_amount_usd'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2338fa168ce3468bbab45ba0d8662110'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'product_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2440213e8f0c4092a585918c90ce6642'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'customer_id'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '24dc28dbb5e84b199ce7ef744fc778a2'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'payment_method'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '25133fb532534a41a94d815afe36b228'
                        key: {
                            application_file: '37ad4d5b359e4b649ab871f53f60f05f'
                            source_artifact: 'fc9a14a38f134daab425f9f4d5d4f5cd'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '26006422de6146e6bc4a8cbadd710d3a'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'day_of_week'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '284c33bf844047ada596ca40d266bfcb'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'subtotal_usd'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '293363f358284fe987d75a39815acdeb'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'pages_viewed_before_purchase'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '29e4f8f5310b43a3b740911a54239293'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'delivery_days'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2a685caf33f84207ab5402e2c5551274'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'preferred_category'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '2abd303f3373411db6de6d95c2bf0df4'
                        key: {
                            application_file: 'e2f85027e3ea4ce0a484854b2c177ef5'
                            source_artifact: '9bddb935f43d401781decffd8b0ee472'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2c0566c5df0d415d888dde154acfe7f1'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'preferred_device'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '2cfb16de1d3249fd929c10da6e46ecef'
                        key: {
                            application_file: '3575b5a7601a48cfae1578da3d7e8ae9'
                            source_artifact: 'fc9faa35401944b3b2ac471c12e3e2a7'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2da21aca2e4e44508d35fb7ddb73ebbb'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'tax_pct'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2edd2a8255694a7888a580e553cf6e44'
                        key: {
                            name: 'x_snc_dashboard_se_product_summary'
                            element: 'product_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2f0403c1a31448fbbae5c2dbe642345d'
                        key: {
                            name: 'x_snc_dashboard_se_monthly_revenue'
                            element: 'revenue_usd'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '31d55ac648b0439a98ae578c669ab95f'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'churned'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3324766f0dee446db5be2761050e190a'
                        key: {
                            name: 'x_snc_dashboard_se_monthly_revenue'
                            element: 'year'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '3575b5a7601a48cfae1578da3d7e8ae9'
                        key: {
                            name: 'x_snc_dashboard_se/aurora/app.js.map'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '361c6000c7f24f4b8ac15ad03a244332'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'customer_rating'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '363021055ec24d1e8a01e34328c6ab72'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'shipping_fee_usd'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: '37ad4d5b359e4b649ab871f53f60f05f'
                        key: {
                            endpoint: 'x_snc_dashboard_se_balanco.do'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3e84727dd9b040d5952b48de309b78c0'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'preferred_device'
                            value: 'Tablet'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '403318247b6f4900a14dc1828f4426c3'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'membership_tier'
                            value: 'Free'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '405a4ea021ff4881be580ecbd910d1b1'
                        key: {
                            name: 'x_snc_dashboard_se_product_summary'
                            element: 'category'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '446c1b8b97f546fe965ae519fea09ca1'
                        key: {
                            name: 'x_snc_dashboard_se_product_summary'
                            element: 'avg_discount_pct'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '44ae39f730bf4cfd9ccc9b8c94fac9e8'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'customer_id'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '47cdda8865cc41c2832888c6b0fa64da'
                        key: {
                            name: 'x_snc_dashboard_se_monthly_revenue'
                            element: 'avg_order_value'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4828e13131f54355888de10b1ef5ff46'
                        key: {
                            name: 'x_snc_dashboard_se_monthly_revenue'
                            element: 'orders'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4888ca27c4f44458a8885b390e758019'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'discount_amount_usd'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '499515e93ed44077bd9747bfe9e9f85b'
                        key: {
                            name: 'x_snc_dashboard_se_product_summary'
                            element: 'avg_rating'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4a957904f11141f6bee36cf3b7e64a75'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'wishlist_items'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4f08e662785b406cb48150aaa9126677'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'device_used'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '520007f6ed754de4b34d2c5ebd1d51d1'
                        key: {
                            name: 'x_snc_dashboard_se_monthly_revenue'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '52b363d6a31943c79f7e0fa0cdbc0fa1'
                        key: {
                            name: 'x_snc_dashboard_se_monthly_revenue'
                            element: 'unique_customers'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5457ee41066b4b9cbe582923bbb07fde'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'year'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '54f802c37abb458a8e5fc3f16805f290'
                        key: {
                            name: 'x_snc_dashboard_se/vendor-apexcharts--47036c25.js.map'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '57ce4c9815e64591aa9fd24b2970dc2f'
                        key: {
                            name: 'x_snc_dashboard_se_monthly_revenue'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5804ea8e348e41eab392b5f6652e7c87'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'total_orders'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '583c701bb1b942eabca153bd0de84b25'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'quarter'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5d38f09272dd4b72b4c4f2d92239123a'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'payment_method'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5d9daa3a7f064063b11d241bd1b77a3a'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'registration_date'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '5e0d04d7aab04d6f8a220d6b3abee987'
                        key: {
                            application_file: 'f6daecc6d4c54930af7c88f2d9b94988'
                            source_artifact: 'fc9faa35401944b3b2ac471c12e3e2a7'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '5e1ead68217b46a8a8ea7e32c7f364f9'
                        key: {
                            application_file: '858b1cd5d3af4deea7924d2bc6e07cc9'
                            source_artifact: 'fc9a14a38f134daab425f9f4d5d4f5cd'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '629c86884487491997c64c1408563451'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'discount_pct'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '661fbd0238d742bb80df0245df20662e'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'pages_viewed_before_purchase'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '667ef6f2559d46f79f1a4ebf34b9325f'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'acquisition_channel'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '673a523571134cfaa14a0f30b60890bb'
                        key: {
                            name: 'x_snc_dashboard_se_product_summary'
                            element: 'avg_discount_pct'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '689a11b5ac9f45168e413b23808f199a'
                        key: {
                            name: 'x_snc_dashboard_se_product_summary'
                            element: 'return_rate'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '6939914d3d3840b6a9516eee54ba4262'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6a06aaadf8fd4b72ae9d327d96f9027b'
                        key: {
                            name: 'x_snc_dashboard_se_monthly_revenue'
                            element: 'revenue_usd'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6a5b917ffd0a49c484a59ca804e0c4e2'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'shipping_fee_usd'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6b0454981d924a2088c8c76db924797b'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'quantity'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6de2a50185ca42f8a10aa350e6e25547'
                        key: {
                            name: 'x_snc_dashboard_se_product_summary'
                            element: 'total_orders'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '6f86cc7be4124b3a85a17047e08becf1'
                        key: {
                            application_file: '8d8505ad07754799a9f483997de6be32'
                            source_artifact: 'fc9faa35401944b3b2ac471c12e3e2a7'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7218801568ed4615ad9f7a2b1862d7b8'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'acquisition_channel'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '74c0678b62b0488d8f1060d475639787'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'newsletter_subscribed'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '76591ce5f32143eca507289441da422c'
                        key: {
                            name: 'x_snc_dashboard_se_monthly_revenue'
                            element: 'return_rate'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '769c2cd3654d4b699c1572357e961392'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'order_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '76ef61a4cf264cba8859d49305c90c19'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'days_since_last_purchase'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7af15a27a9b740c29d982d1628439ef2'
                        key: {
                            name: 'x_snc_dashboard_se_monthly_revenue'
                            element: 'avg_order_value'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '7b28daf75908481aa6e0841c90124a1f'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'device_used'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact'
                        id: '7b7fcfbd0dfc4fbd941b4b6bc159cc89'
                        key: {
                            name: 'x_snc_dashboard_se_nexus.do - BYOUI Files'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7bdd84806d84427db12e02044c36b2e6'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'membership_tier'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7c5497c1876c449fa052752694a874d8'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'total_amount_usd'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7efdd45402bb4e749f6e3c6007caeea8'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'unit_price_usd'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '80da87c14e3048e6afa8989ee7cbdfbc'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'tax_pct'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '811fdb53f8ea48f6adf2765ddec90ce4'
                        key: {
                            name: 'x_snc_dashboard_se_product_summary'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '8160fac4214746489064183a08e82228'
                        key: {
                            name: 'x_snc_dashboard_se_product_summary'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '818d5b3bca0f4293825ba83440c997f1'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'returned'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '81a28881b7ef4bc4b0f21fd62ea77965'
                        key: {
                            name: 'x_snc_dashboard_se/vendor-apexcharts--47036c25'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '82e6be3641ce49afb924d33bf08247df'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'preferred_device'
                            value: 'Mobile'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: '83b53cd638774208a5f94bbb6ecd65f4'
                        key: {
                            endpoint: 'x_snc_dashboard_se_nexus.do'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8488d684d952436f84c22555ea65c719'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'preferred_payment_method'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '858b1cd5d3af4deea7924d2bc6e07cc9'
                        key: {
                            name: 'x_snc_dashboard_se/balanco/app.js.map'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '85d5c91327e6460baf811fe6ddef8f10'
                        key: {
                            name: 'x_snc_dashboard_se_product_summary'
                            element: 'avg_price'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '881a917eb7aa43a497424fa12d470cbe'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '88df28b860944db981ffa8fe0b445359'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'quantity'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '89e1b5f6c2154a9e9f238a20c2d8a520'
                        key: {
                            name: 'x_snc_dashboard_se_product_summary'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8bbc292461394072acffc24680a99312'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'country'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8d0a734b4c684a53a6cdcee3aa0a741b'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'gender'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: '8d8505ad07754799a9f483997de6be32'
                        key: {
                            endpoint: 'x_snc_dashboard_se_aurora.do'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8e02233924104cd7b10257200af7dc11'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'newsletter_subscribed'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8ea0f998fa93432aaf42df9bfce61a8d'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'avg_order_value_usd'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '8f4871bdbb9f4c87aec2fd31eaabcf9b'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'gender'
                            value: 'Female'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8f559090028f4c448d2935b7fe2fc670'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'session_duration_minutes'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '92cd768ae7f0486d95e10e3f6b9746ff'
                        key: {
                            name: 'x_snc_dashboard_se/balanco/app'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '9312b4ff3e0040f39670052e205969fe'
                        key: {
                            application_file: '83b53cd638774208a5f94bbb6ecd65f4'
                            source_artifact: '7b7fcfbd0dfc4fbd941b4b6bc159cc89'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '957ce80e5af542e39ed72f9a1b74a544'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'device_used'
                            value: 'Mobile'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9a1011af45f64a6f908687fe181d4323'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'delivery_days'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9a694e528ed441209e27c8f219bb49af'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'age'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9a7d7029cae64f04bc03574147d09996'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'avg_review_score'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9aef59dd55794f73b4f364217e200ce1'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'membership_tier'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact'
                        id: '9bddb935f43d401781decffd8b0ee472'
                        key: {
                            name: 'x_snc_dashboard_se_portal.do - BYOUI Files'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9c02566745624568ad59c612537dc7bf'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'device_used'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9cbdeab640de425fa49a3753190d6b65'
                        key: {
                            name: 'x_snc_dashboard_se_product_summary'
                            element: 'avg_price'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9da7174b928b431da2660a8a60aa5712'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'returns_made'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9fb97087643540b5bab5fe483d48797e'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'order_status'
                            value: 'Delivered'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9fc5094bb7f24af08cb93c3fe75c0ac2'
                        key: {
                            name: 'x_snc_dashboard_se_monthly_revenue'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a2432e6c0c1d49b5adea4ecc8b14b69d'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'total_spend_usd'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a32e463790ee407cb1208a40e366af54'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'order_status'
                            value: 'Processing'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a5c8d196376c476f9a845fb4482db278'
                        key: {
                            name: 'x_snc_dashboard_se_product_summary'
                            element: 'product_name'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a6444cfd78fa4b8a99c908c6a5636ba4'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'churned'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a6b8e08c60a6488c8bfcd40d5a1417a8'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'order_status'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a7964e69b7a84cdcb2117dda4d382eb7'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'year'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a83c5c8a592549329b5d7717974637ba'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'device_used'
                            value: 'Desktop'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a900699447e848118abd7dd2f7726bec'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'subtotal_usd'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a926ab04091244ce865bb1fabb7b622d'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'aab7326924b3430b8d5628f7fab40b37'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'order_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b1349bb13c4644d0a22f4b75ac19d173'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'discount_amount_usd'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: 'b1727caddee34268a1d0091fbe4690ec'
                        key: {
                            application_file: '81a28881b7ef4bc4b0f21fd62ea77965'
                            source_artifact: '7b7fcfbd0dfc4fbd941b4b6bc159cc89'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: 'b261a3df0f9a49fbb6717200a0a891d5'
                        key: {
                            name: 'x_snc_dashboard_se/nexus/app.js.map'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b49f0fce61bc4a05acf550d6027e0be8'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'device_used'
                            value: 'Tablet'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b6ea2533e3704291aebf89c71964c917'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'customer_rating'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b89400b9479f47569993f63949a5060b'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'order_status'
                            value: 'Cancelled'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: 'be4543407ca9457687ce2981e278405e'
                        key: {
                            application_file: 'efad5b8bb93040feb2f4ee48f24dc39c'
                            source_artifact: '7b7fcfbd0dfc4fbd941b4b6bc159cc89'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bf6bd358be364154bbdaeb511aec1e43'
                        key: {
                            name: 'x_snc_dashboard_se_monthly_revenue'
                            element: 'return_rate'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c12d577b0f71409b8652c382da6c6ca9'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c2505082cde84c48a52785e22860e095'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'wishlist_items'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c3a1b97767dd45bba9781b0ec828d8b8'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'membership_tier'
                            value: 'Platinum'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c3a87ecaf0f34315ae5b18b1ff03937d'
                        key: {
                            name: 'x_snc_dashboard_se_product_summary'
                            element: 'total_revenue_usd'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c93114b0cdf64122a8068c366d44fe83'
                        key: {
                            name: 'x_snc_dashboard_se_monthly_revenue'
                            element: 'new_customers'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'cd46d0cc5022405ea8b06cd5b3add6ad'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'registration_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'cd826da080c9421ea58781e3fba0758e'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'cf552045df5d43d5b7eae4e1eae77ddd'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'tax_amount_usd'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd11e521cdc05414e97873ec9a1cde827'
                        key: {
                            name: 'x_snc_dashboard_se_monthly_revenue'
                            element: 'orders'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd273f6cc59a64759bd7684d373184447'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'gender'
                            value: 'Male'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd29fe6c1328e4c92a8fe8b7acdb7093c'
                        key: {
                            name: 'x_snc_dashboard_se_product_summary'
                            element: 'category'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd3951118c21b477193f869cc5441d7ea'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'preferred_payment_method'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd3ecdd0ca0784eb188cd8e4b53e1d91e'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'membership_tier'
                            value: 'Gold'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd4679af8ff16404183a0eb4377a5f016'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'is_repeat_customer'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd4c8208169cc4bc8a8e6356fe299853a'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'avg_order_value_usd'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd5bddf15d16f42e990813efd3618c2e0'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd6c0ec264c07429086f505df9debcb17'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'delivery_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd6c25c8753184bceb1056a54eda39da3'
                        key: {
                            name: 'x_snc_dashboard_se_product_summary'
                            element: 'avg_delivery_days'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd70079c755744fea97eef7db8520ba47'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'product_name'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'd93a9382c7594d688347de3b4c162f22'
                        key: {
                            name: 'x_snc_dashboard_se_product_summary'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd9a95e9c1b73470799d1a15ba7c9a237'
                        key: {
                            name: 'x_snc_dashboard_se_monthly_revenue'
                            element: 'month'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'db34636799ad4180947f04d134df2282'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'quarter'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'dc255ee0e0de49f1a1c9b37cd34ec141'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'country'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'dca334c1527d4d098340d88248b33db5'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'membership_tier'
                            value: 'Silver'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'dcbf90b04e394f7ebd86d0fc1aa3dca9'
                        key: {
                            name: 'x_snc_dashboard_se_product_summary'
                            element: 'avg_rating'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'dd23b34ce66d484ca4a48858738b45ed'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'delivery_date'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'dfb8ff850ef845cd89457db7c32cd4ec'
                        key: {
                            name: 'x_snc_dashboard_se_monthly_revenue'
                            element: 'new_customers'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'dfcd698b29124038b156807fc6a01779'
                        key: {
                            name: 'x_snc_dashboard_se_product_summary'
                            element: 'total_orders'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e06705a551fc4f459b4a0f7eacaf1e33'
                        key: {
                            name: 'x_snc_dashboard_se_monthly_revenue'
                            element: 'unique_customers'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e15af917634140eabc11872d2fdb7701'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'category'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e1999ef6abe64a8bb3dde39403c66e59'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'avg_review_score'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e296e3b091af4fa899c58a7b3f5cd903'
                        key: {
                            name: 'x_snc_dashboard_se_product_summary'
                            element: 'avg_delivery_days'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: 'e2f85027e3ea4ce0a484854b2c177ef5'
                        key: {
                            endpoint: 'x_snc_dashboard_se_portal.do'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e4c53f215bac42b8bd7da91491ef21b8'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'preferred_device'
                            value: 'Desktop'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e68c7cf4a3b945c39804f009afec5bd6'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'order_id'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: 'e77b7f1557b84ef5a8fd700e794ac731'
                        key: {
                            name: 'x_snc_dashboard_se/portal/app.js.map'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'e7bf1551416c4e04861bc8fd474f061a'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'gender'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: 'e84b0bf7a57945baa572e23067202d42'
                        key: {
                            application_file: '92cd768ae7f0486d95e10e3f6b9746ff'
                            source_artifact: 'fc9a14a38f134daab425f9f4d5d4f5cd'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'e89541c69fc54b0b87a6724eb379cd9a'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'membership_tier'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: 'e9276b7f879b44a4b62f8bb5ed9de761'
                        key: {
                            application_file: 'ff165872494847f09dbdfabbcd7f1f94'
                            source_artifact: '9bddb935f43d401781decffd8b0ee472'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'e9c7bc556c5047d29bd897106e18a5d8'
                        key: {
                            name: 'x_snc_dashboard_se_monthly_revenue'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ea9977b981fb4b4f9ed9c2d0527c317e'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'unit_price_usd'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'eaa1b4b978b74b6bbc43b9367774c362'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'reviews_given'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'eb3db01f5ec443a297f949d689e2b712'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'total_spend_usd'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ec9d432fee3d4d1eb2685111737460e7'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'category'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ec9e55afa249438b936a133b7d67e8ca'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'tax_amount_usd'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ecd12258f1504c03a446473b82bb9122'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'gender'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: 'efad5b8bb93040feb2f4ee48f24dc39c'
                        key: {
                            name: 'x_snc_dashboard_se/nexus/app'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f05578bf3e534b58913b4a204836a026'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'month'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f0fba9afe3d24a60be2e652845d08d9c'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'days_since_last_purchase'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f12aa2ef87dd40609b7afa4b2d054e0a'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'gender'
                            value: 'Other'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f25f75841bd24ce9a892e4c66c9404d4'
                        key: {
                            name: 'x_snc_dashboard_se_monthly_revenue'
                            element: 'avg_discount_pct'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: 'f2e81509bfba47b5bf9b8961f8072947'
                        key: {
                            application_file: 'b261a3df0f9a49fbb6717200a0a891d5'
                            source_artifact: '7b7fcfbd0dfc4fbd941b4b6bc159cc89'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f3ff183afdeb4a5eaab6bd06da4f5284'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: 'f6daecc6d4c54930af7c88f2d9b94988'
                        key: {
                            name: 'x_snc_dashboard_se/aurora/app'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f75adf6cd34b4383b9e9b4365597ce62'
                        key: {
                            name: 'x_snc_dashboard_se_customer'
                            element: 'preferred_category'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'faed174b8fd3437cafc906292c97f775'
                        key: {
                            name: 'x_snc_dashboard_se_monthly_revenue'
                            element: 'year'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fc02c0ee83774742a5c1de3822bc24b5'
                        key: {
                            name: 'x_snc_dashboard_se_monthly_revenue'
                            element: 'month'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact'
                        id: 'fc9a14a38f134daab425f9f4d5d4f5cd'
                        key: {
                            name: 'x_snc_dashboard_se_balanco.do - BYOUI Files'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact'
                        id: 'fc9faa35401944b3b2ac471c12e3e2a7'
                        key: {
                            name: 'x_snc_dashboard_se_aurora.do - BYOUI Files'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'fe066136cbb344c4b9c359aa0f8a0f3c'
                        key: {
                            name: 'x_snc_dashboard_se_order'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: 'ff165872494847f09dbdfabbcd7f1f94'
                        key: {
                            name: 'x_snc_dashboard_se/portal/app'
                        }
                    },
                ]
            }
        }
    }
}
