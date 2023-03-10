import React, { useEffect, useRef } from 'react'

function Card(props) {
	// 이미지 래퍼런스를 가져온다.
	const imgRef = useRef(null);

	// userEffect 를 사요하지 않으면 랜더링할때마다 인스턴스가 생성되고, 
	// 대상요소를 관찰하게 되면서 대상요소에 여러개의 콜백이 실행된다.
	// 따라서 이와같은 중복을 방지하고자 userEffect에서 인스턴스를 생성해야 한다.
	useEffect(() => {
		const options = {}
		const callback = (entries, observer) => {
			console.log('Entries',entries);
		}

		const observer = new IntersectionObserver(callback, options);
		observer.observe(imgRef.current)

		// observer.disconnect 함수를 호출함으로써 리소스가 낭비되지 않도록 한다.
		return () => observer.disconnect()

	}, [])

	return (
		<div className="Card text-center">
			<img src={props.image} ref={imgRef} />
			<div className="p-5 font-semibold text-gray-700 text-xl md:text-lg lg:text-xl keep-all">
				{props.children}
			</div>
		</div>
	)
}

export default Card
