//
//  Camera.swift
//  Stream
//
//  Created by Toan Nguyen Dinh on 1/2/18.
//  Copyright © 2018 Toan Nguyen Dinh. All rights reserved.
//

import Foundation

class Camera{
    
    let name: String!
    let isConnected: Bool!
    let isLive: Bool!
    let url: String!
    
    init(name: String, isConnected: Bool, isLive: Bool, url: String) {
        self.name = name
        self.isConnected = isConnected
        self.isLive = isLive
        self.url = url
    }
    
}
