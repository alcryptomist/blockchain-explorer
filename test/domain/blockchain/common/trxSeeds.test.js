export const trxs = [
  // spending trx of 5000000 satoshi
    {
      "hash": "e4e34b4c13e9bf902723dd2f7953ad5278806826f42ab576727b6ee97bf447ec",
      "received_at": "2017-01-08T08:36:21Z",
      "lock_time": 0,
      "block": {
        "hash": "000000000000000001c7dc178a48f5f7e3dbc799558e00b351bd01f9dc22d3ad",
        "height": 447155,
        "time": "2017-01-08T08:36:21Z"
      },
      "inputs": [
        {
          "input_index": 0,
          "output_hash": "08b69c3c755c140c792e582bd2d49e883f934934377e5e58a88005189319e860",
          "output_index": 0,
          "value": 5000000,
          "address": "1HE4ShfmuG7AdVr5RpaCtXfsJYYQQFCj1T",
          "script_signature": "483045022100beb4f1fd45f0914dd42a33e631855f7e4142321ac495e66f023dca3e95da685a02204039dacb000ac1d28053f96c0ba52155c3ed7f9fb67a3fc31f4fa32b610fcdc40121026588cd1b81ba1413e5aa3108d68de73e879a657676e9e71b09bf19eaeb9d9671"
        },
        {
          "input_index": 1,
          "output_hash": "8bca9252c9e66741df339f3acc3e1d1b4ec91e3dc64a9e03974328dc7ab49552",
          "output_index": 1,
          "value": 158787,
          "address": "18KxBCANMaghMLsrkZTtdKbWCpR7L5mu8g",
          "script_signature": "483045022100fb5f6627fc1e2da646d0bbc0cb6b353e256ae4410f3172a18c71d1146cb8ed5e02202d8db2c2ba12ac67deb44b2ec278062e6c92156a8f814d787772c7247ddb967e0121039005aab006d345c0ef1f6b25026c4f430c617894ca89fceecd7acc31e676fe18"
        }
      ],
      "outputs": [
        {
          "output_index": 0,
          "value": 134477,
          "address": "1EY9MscD8BLpyyCRBmhQMSnBHiyrCByfpk",
          "script_hex": "76a914947d822b552a3c609ac2b2941f96a3a92398eac688ac"
        },
        {
          "output_index": 1,
          "value": 5000000,
          "address": "1PqHd5hT6Z3zoNdJKznxEzg3bq4xk2YBtZ",
          "script_hex": "76a914fa749bdc2102579e12fe53b084f4bdc4715f0a3988ac"
        }
      ],
      "fees": 24310,
      "amount": 5134477,
      "confirmations": 33258
    },
  // funding trx of 5000000 satoshi
    {
      "hash": "08b69c3c755c140c792e582bd2d49e883f934934377e5e58a88005189319e860",
      "received_at": "2017-01-08T08:36:22Z",
      "lock_time": 0,
      "block": {
        "hash": "000000000000000001c7dc178a48f5f7e3dbc799558e00b351bd01f9dc22d3ad",
        "height": 447155,
        "time": "2017-01-08T08:36:21Z"
      },
      "inputs": [
        {
          "input_index": 0,
          "output_hash": "bbcc76c13321d453aac34f3cfc2d96f54fda606a0756b906da51a81d8e9548ff",
          "output_index": 1,
          "value": 184925930,
          "address": "1cm5TKeiTBMCKirSmrA7GeRnre5MY6748",
          "script_signature": "473044022017589663cce8aab90525273a72711e3f5c2a10de456e8de690c291d3263f58df022066d491df2da86a2db1e5e23a6c5acae63a81f377036497d5c082390b222e3306012102a50e3cb287b86b18448d1c1a80b32cafe56b48f0e10ef8b14b8dd52056acae69"
        }
      ],
      "outputs": [
        {
          "output_index": 0,
          "value": 5000000,
          "address": "1HE4ShfmuG7AdVr5RpaCtXfsJYYQQFCj1T",
          "script_hex": "76a914b1fa4b51eb0e1391acc6a074614a4aa9210b7f2088ac"
        },
        {
          "output_index": 1,
          "value": 179911240,
          "address": "194bGtyaTwggRfuTST3Uxtp1fGFW4bDvNU",
          "script_hex": "76a914586edd5d9851aa592533448d7c4d8c452ca1994c88ac"
        }
      ],
      "fees": 14690,
      "amount": 184911240,
      "confirmations": 33258
    }
];