//
//  ViewController.swift
//  Stream
//
//  Created by Toan Nguyen Dinh on 12/29/17.
//  Copyright © 2017 Toan Nguyen Dinh. All rights reserved.
//

import UIKit

class ViewController: UIViewController, UICollectionViewDelegateFlowLayout, UICollectionViewDataSource {


    let cellId: String = "cellId"
    
    let layout: UICollectionViewFlowLayout = {
        
        let collection_layout = UICollectionViewFlowLayout()
        
        collection_layout.itemSize = CGSize(width: 100, height: 100)
        collection_layout.minimumInteritemSpacing = 1.0
        collection_layout.minimumLineSpacing = 1.0
        collection_layout.sectionInset = UIEdgeInsets(top: 0, left: 0, bottom: 0, right: 0)
        collection_layout.scrollDirection = .vertical
        
        return collection_layout
        
    }()
    lazy var collectionView: UICollectionView = {
        
        let collection_view = UICollectionView(frame: self.view.frame, collectionViewLayout: self.layout)
        
        collection_view.translatesAutoresizingMaskIntoConstraints = false
        
        return collection_view
    }()
    
    
    func setupCollectionView(){
        
        
        self.view.addSubview(collectionView)
        
        
        // setup auto layout for collection view
        let parentView: UIView = self.view
        collectionView.topAnchor.constraint(equalTo: parentView.topAnchor, constant: 0).isActive = true
        collectionView.leftAnchor.constraint(equalTo: parentView.leftAnchor, constant: 0).isActive = true
        collectionView.rightAnchor.constraint(equalTo: parentView.rightAnchor, constant: 0).isActive = true
        collectionView.bottomAnchor.constraint(equalTo: parentView.bottomAnchor, constant: 0).isActive = true
        
        self.collectionView.delegate = self
        collectionView.dataSource = self
        
        // give an example backgrond color for collection view
        
        collectionView.backgroundColor = .white
        
        // register a sub class for collection cell
        
        self.collectionView.register(CameraCollectionViewCell.self, forCellWithReuseIdentifier: cellId)
        
        
    }
    
    func numberOfSections(in collectionView: UICollectionView) -> Int {
        
        return 1
    }
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        
        return 12
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        
        let cell: CameraCollectionViewCell = collectionView.dequeueReusableCell(withReuseIdentifier: cellId, for: indexPath) as! CameraCollectionViewCell
        
        cell.camera = Camera(name: "Camera title", isConnected: true, isLive: true, url: "rtmp://192.168.1.10/play/tabvn")
        
        cell.setupPlayer()
        
        cell.backgroundColor = .black
        
        return cell
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        
        let padding: CGFloat = 2.0
        let width = collectionView.frame.width - padding
        
        if UIApplication.shared.statusBarOrientation.isLandscape{
            
            return CGSize(width: width/3, height: width/3)
        }
        return CGSize(width: width/2, height: width/2)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        setupCollectionView()
        
    }
    
   



}

